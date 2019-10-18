import {actionCreatorFactory} from 'conduxion';
import {forEach, throttle, assign, reduce, values} from 'lodash';

import {AppActionMould, Row} from '../state';
import {ViewtronViews} from '../../types';

import {VIEWS_UPDATED_MESSAGE} from '../../constants';
import calculateNewViewRects from '../utils';

const throttledEmitter = throttle((mainWindow, rows: Row[], views: ViewtronViews[]) => {
    mainWindow.webContents.send(VIEWS_UPDATED_MESSAGE, {rows, views});
}, 200, {leading: true, trailing: true}); // @todo: leading false?

export type UpdateViewsAction = AppActionMould<'UPDATE_VIEWS', undefined>

export const [updateViews] = actionCreatorFactory<UpdateViewsAction>({
    type: 'UPDATE_VIEWS',
    reducer(state) {
        const {config, currentAppAreaRect, rows, viewOptions} = state;
        const views = values(viewOptions);

        if (!currentAppAreaRect) return state;

        const updatedViews = calculateNewViewRects(config, currentAppAreaRect, rows, views);

        return {
            ...state,
            viewOptions: reduce(updatedViews, (agg, view) => assign(agg, {[view.id]: view}), {})
        }
    },
    consequence({getState}) {
        const {activeViews, mainWindow, viewOptions, rows} = getState();
        const views = values(viewOptions);

        forEach(views, ({id, rect}) => {
            const view = activeViews[id];

            if (!view || !rect) return;

            view.setBounds(rect);
        });

        throttledEmitter(mainWindow, rows, values(viewOptions));
    }
});
