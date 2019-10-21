import {actionCreatorFactory} from 'conduxion';
import {forEach, throttle} from 'lodash';

import {AppActionMould} from '../state';
import {ViewtronUpdateData} from '../../types';

import {VIEWTRON_UPDATE_MESSAGE} from '../../constants';
import recalculateViews from '../utils';

const throttledEmitter = throttle((mainWindow, data: ViewtronUpdateData) => {
    mainWindow.webContents.send(VIEWTRON_UPDATE_MESSAGE, data);
}, 200, {leading: true, trailing: true}); // @todo: leading false?

export type UpdateViewsAction = AppActionMould<'UPDATE_VIEWS', undefined>

export const [updateViews] = actionCreatorFactory<UpdateViewsAction>({
    type: 'UPDATE_VIEWS',
    reducer(state) {
        const {config, currentAppAreaRect, rows, columns, views} = state;

        if (!currentAppAreaRect) return state;

        return {
            ...state,
            views: recalculateViews(config, currentAppAreaRect, rows, columns, views)
        }
    },
    consequence({getState}) {
        const {activeViews, mainWindow, views, rows, columns} = getState();

        forEach(views, ({id, rect}) => {
            const view = activeViews[id];

            if (!view || !rect) return;

            view.setBounds(rect);
        });

        throttledEmitter(mainWindow, {rows, columns, views});
    }
});
