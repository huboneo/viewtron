import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {forEach, throttle, filter} from 'lodash';

import {AppActionMould} from '../state';
import {ViewtronUpdateData} from '../../types';

import {VIEWTRON_UPDATE_MESSAGE} from '../../constants';
import recalculateViews from '../utils';

const throttledEmitter = throttle((mainWindow, data: ViewtronUpdateData) => {
    mainWindow.webContents.send(VIEWTRON_UPDATE_MESSAGE, data);
}, 200, {trailing: true}); // @todo: leading false?

export type UpdateViewsPayload = { windowId: string };

export type UpdateViewsAction = AppActionMould<'UPDATE_VIEWS', UpdateViewsPayload>

export const [updateViews] = actionCreatorFactory<UpdateViewsAction>({
    type: 'UPDATE_VIEWS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {windowId} = payload;
            const {activeWindows, rows, columns, views} = draft;
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect) return state;

            draft.views = [
                ...filter(views, (view) => view.windowId !== windowId),
                ...recalculateViews(
                    config,
                    rect,
                    filter(rows, (row) => row.windowId === windowId),
                    filter(columns, (column) => column.windowId === windowId),
                    filter(views, (view) => view.windowId === windowId)
                )
            ]
        });
    },
    consequence({getState, action}) {
        const {windowId} = action.payload;
        const {activeWindows, views, rows, columns} = getState();
        const viewtronWindow = activeWindows[windowId];
        const windowRows = filter(rows, (row) => row.windowId === windowId);
        const windowColumns = filter(columns, (column) => column.windowId === windowId);
        const windowViews = filter(views, (view) => view.windowId === windowId);

        forEach(windowViews, ({instance, rect}) => {
            if (!instance || !rect) return;

            instance.setBounds(rect);
        });

        throttledEmitter(viewtronWindow.instance, {
            rows: windowRows,
            columns: windowColumns,
            views: windowViews
        });
    }
});
