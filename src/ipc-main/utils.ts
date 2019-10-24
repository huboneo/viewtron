import {Rectangle} from 'electron';
import {filter, map, sumBy, flatMap, find, slice, includes} from 'lodash';

import {Column, ViewtronConfig, ViewtronView, Row} from '../types';

export default function calculateViewRects(config: ViewtronConfig, mainRect: Rectangle, rows: Row[], columns: Column[], views: ViewtronView[]) {
    const visibleRows = filter(rows, ({hidden}) => !hidden);
    const defaultRows = filter(visibleRows, ({height}) => !height);
    const overriddenRows = filter(visibleRows, 'height');
    const remainingDefaultHeight = minXInt(
        mainRect.height - sumBy(overriddenRows, ({height}) => minXInt(getPixelValue(config, mainRect.height, height!), config.minHeight)),
        config.minHeight
    );
    let currY = mainRect.y || 0;
    let rowIndex = -1;

    return flatMap(rows, (row) => {
        const {height} = row;
        const rowColumns = filter(columns, ({rowId}) => rowId === row.id);

        if (row.hidden) {
            const rowColumnIds = map(rowColumns, 'id');

            return filter(views, ({columnId}) => includes(rowColumnIds, columnId));
        }

        rowIndex++;

        const visibleRowColumns = filter(rowColumns, ({hidden}) => !hidden);
        const defaultRowHeight = minXInt(remainingDefaultHeight / defaultRows.length, config.minHeight);
        const calculatedRowHeight = height
            ? getPixelValue(config, mainRect.height, height)
            : defaultRowHeight;
        const finalRowHeight = rowIndex !== visibleRows.length - 1
            ? calculatedRowHeight - config.spacing
            : calculatedRowHeight;
        const defaultColumns = filter(visibleRowColumns, ({width}) => !width);
        const overriddenColumns = filter(visibleRowColumns, 'width');
        const remainingDefaultColumnWidth = minXInt(
            mainRect.width - sumBy(overriddenColumns, ({width}) => minXInt(getPixelValue(config, mainRect.width, width!), config.minWidth)),
            config.minWidth
        );
        let currX = mainRect.x || 0;
        let columnIndex = -1;

        const rowViews = flatMap(rowColumns, (column) => {
            let currColumnY = currY;
            const columnViews = filter(views, (view) => view.columnId === column.id);

            if (column.hidden) return columnViews;

            columnIndex++;

            const visibleColumnViews = filter(columnViews, ({hidden}) => !hidden);
            const defaultViewHeights = filter(visibleColumnViews, ({height}) => !height);
            const overriddenViewHeights = filter(visibleColumnViews, 'height');
            const remainingDefaultViewHeight = minXInt(
                finalRowHeight - sumBy(overriddenViewHeights, ({height}) => minXInt(getPixelValue(config, finalRowHeight, height!), config.minHeight)),
                config.minHeight
            );
            const x = currX;
            const defaultViewHeight = minXInt(
                remainingDefaultViewHeight / defaultViewHeights.length,
                config.minHeight
            );
            const defaultColumnWidth = minXInt(
                remainingDefaultColumnWidth / defaultColumns.length,
                config.minWidth
            );
            const calculatedColumnWidth = minXInt(
                column.width
                    ? getPixelValue(config, mainRect.width, column.width)
                    : defaultColumnWidth,
                config.minWidth
            );
            const finalColumnWidth = columnIndex !== visibleRowColumns.length - 1
                ? calculatedColumnWidth - config.spacing
                : calculatedColumnWidth;

            currX += finalColumnWidth + config.spacing;

            let viewIndex = -1;

            return map(columnViews, (view) => {
                if (view.hidden) return view;

                viewIndex++;

                const y = currColumnY;
                const calculatedViewHeight = view.height
                    ? getPixelValue(config, finalRowHeight, view.height)
                    : defaultViewHeight;
                const finalViewHeight = viewIndex !== visibleColumnViews.length - 1
                    ? calculatedViewHeight - config.spacing
                    : calculatedViewHeight;

                currColumnY += finalViewHeight + config.spacing;

                return {
                    ...view,
                    rect: {
                        x: minXInt(x, config.spacing),
                        y: minXInt(y, config.spacing),
                        width: minXInt(finalColumnWidth, config.minWidth),
                        height: minXInt(finalViewHeight, config.minHeight),
                    }
                };
            });
        });

        currY += finalRowHeight + config.spacing;

        return rowViews;
    });
}

function getPixelValue(config: ViewtronConfig, base: number, target: number) {
    if (config.responsive) {
        return base * target;
    }

    return target;
}

export function getOverrideValue(config: ViewtronConfig, base: number, target: number) {
    if (config.responsive) {
        return target / base;
    }

    return target;
}

function minXInt(num: number, min: number) {
    return Math.floor(Math.max(num, min));
}

export function reorderItems<T = any>(items: T[], oldIndex: number, newIndex: number) {
    if (oldIndex < 0 || oldIndex === newIndex || newIndex >= items.length) return items;

    const moved = find(items, (_, index) => index === oldIndex);
    const remaining = filter(items, (_, index) => index !== oldIndex);

    if (!moved) return items;

    return [
        ...slice(remaining, 0, newIndex),
        moved,
        ...slice(remaining, newIndex)
    ];
}
