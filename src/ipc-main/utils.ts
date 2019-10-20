import {Rectangle} from 'electron';
import {filter, map, sumBy, flatMap} from 'lodash';

import {ViewtronView, ViewtronConfig} from '../types';

import {Row, Column} from './state';

export default function calculateViewRects(config: ViewtronConfig, mainRect: Rectangle, rows: Row[], columns: Column[], views: ViewtronView[]) {
    const defaultHeights = filter(rows, ({height}) => !height);
    const overriddenHeights = filter(rows, 'height');
    let remainingDefaultHeight = minXInt(
        mainRect.height - sumBy(overriddenHeights, ({height}) => minXInt(getPixelValue(config, mainRect.height, height!), config.minHeight)),
        config.minHeight
    );
    let currY = mainRect.y || 0;

    return flatMap(rows, (row) => {
        const {height} = row;
        const rowColumns = filter(columns, ({rowId}) => rowId === row.id);
        const defaultRowHeights = minXInt((remainingDefaultHeight / defaultHeights.length) - (config.spacing * 2), config.minHeight);
        const finalRowHeight = height ? getPixelValue(config, mainRect.height, height) : defaultRowHeights;
        const defaultColumnWidths = filter(rowColumns, ({width}) => !width);
        const overriddenColumnWidths = filter(rowColumns, 'width');
        let remainingDefaultColumnWidth = minXInt(
            mainRect.width - sumBy(overriddenColumnWidths, ({width}) => minXInt(getPixelValue(config, mainRect.width, width!), config.minWidth)),
            config.minWidth
        );
        let currX = mainRect.x || 0;

        const rowViews = flatMap(rowColumns, (column) => {
            let currColumnY = currY;
            const columnViews = filter(views, (view) => view.columnId === column.id);
            const defaultViewHeights = filter(columnViews, ({height}) => !height);
            const overriddenViewHeights = filter(columnViews, 'height');
            let remainingDefaultViewHeight = minXInt(
                finalRowHeight - sumBy(overriddenViewHeights, ({height}) => minXInt(getPixelValue(config, finalRowHeight, height!), config.minHeight)),
                config.minHeight
            );
            const x = currX + config.spacing;
            const defaultViewHeight = minXInt(
                (remainingDefaultViewHeight / defaultViewHeights.length) - (config.spacing * 2),
                config.minHeight
            );
            const defaultColumnWidth = minXInt(
                (remainingDefaultColumnWidth / defaultColumnWidths.length) - (config.spacing * 2),
                config.minWidth
            );
            const finalColumnWidth = minXInt(
                column.width ? getPixelValue(config, mainRect.width, column.width) : defaultColumnWidth,
                config.minWidth
            );

            currX += (config.spacing * 2) + finalColumnWidth;

            return map(columnViews, (view) => {
                const y = currColumnY + config.spacing;
                // @todo: height harmonization logic
                const finalViewHeight = view.height ? getPixelValue(config, finalRowHeight, view.height) : defaultViewHeight;
                currColumnY += (config.spacing * 2) + finalViewHeight;

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

        currY += (config.spacing * 2) + finalRowHeight;

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
