import {Rectangle} from 'electron';
import {filter, map, sumBy} from 'lodash';

import {ViewOption} from './state';

const VIEW_RECT_SPACING = 5;
const MIN_WIDTH = 50;

export default function calculateViewRects(mainRect: Rectangle, views: ViewOption[]) {
    const defaults = filter(views, ({rectOverride}) => !rectOverride);
    const overridden = filter(views, 'rectOverride');
    let remainingDefaultWidth = mainRect.width - sumBy(overridden, ({rectOverride}) => min50Int(rectOverride!.width));
    let currX = mainRect.x;

    return map(views, (view): ViewOption => {
        if (view.rectOverride) {
            const x = currX + VIEW_RECT_SPACING;

            currX += (VIEW_RECT_SPACING * 2) + view.rectOverride.width;

            return {
                ...view,
                rectOverride: {
                    width: min50Int(view.rectOverride.width),
                    height: min5Int(mainRect.height),
                    x: min5Int(x),
                    y: min5Int(mainRect.y)
                }
            }
        }

        const x = currX + VIEW_RECT_SPACING;
        const width = min50Int((remainingDefaultWidth / defaults.length) - (VIEW_RECT_SPACING * 2));

        currX += (VIEW_RECT_SPACING * 2) + width;

        return {
            ...view,
            rect: {
                ...view.rect,
                height: min5Int(mainRect.height),
                width: min5Int(width),
                x: min5Int(x),
                y: min5Int(mainRect.y)
            }
        }
    })
}

function min50Int(num: number) {
    return Math.floor(Math.max(num, MIN_WIDTH));
}

function min5Int(num: number) {
    return Math.floor(Math.max(num, 5));
}
