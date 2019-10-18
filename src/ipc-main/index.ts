import {BrowserWindow, ipcMain,} from 'electron';
import uuid from 'uuid/v4';

import {addView} from './actions/add-view';
import {removeView} from './actions/remove-view';
import {setAreaRect} from './actions/set-area-rect';
import {setMainWindow} from './actions/set-main-window';
import {setViewRectOverride} from './actions/set-view-rect-override';
import {resetViewRects} from './actions/reset-view-rects';

import {
    ADD_VIEW_MESSAGE,
    SET_VIEW_RECT_OVERRIDE_MESSAGE,
    REMOVE_VIEW_MESSAGE,
    RESET_VIEW_RECTS_MESSAGE,
    VIEW_AREA_INIT_MESSAGE,
    VIEW_AREA_RESIZE_MESSAGE
} from '../constants';

import state, {ViewOption} from './state';

export {ViewOption};
export const addMainWindowHandlers = (mainWindow: BrowserWindow) => state.dispatch(setMainWindow(mainWindow));

export const addViewtronAreaHandlers = () => {
    ipcMain.on(VIEW_AREA_INIT_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setAreaRect(rect))
    });

    ipcMain.on(VIEW_AREA_RESIZE_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setAreaRect(rect))
    })
};

export const addViewInstanceHandlers = () => {
    ipcMain.on(ADD_VIEW_MESSAGE, (_, path) => {
        if (!path) return;

        state.dispatch(addView({id: uuid(), path, name: path}));
    });

    ipcMain.on(SET_VIEW_RECT_OVERRIDE_MESSAGE, (_, {id, rect: rectOverride}) => {
        if (!id || !rectOverride) return;

        state.dispatch(setViewRectOverride({id, rectOverride}));
    });

    ipcMain.on(RESET_VIEW_RECTS_MESSAGE, (_, {id}) => {
        state.dispatch(resetViewRects({id}));
    });

    ipcMain.on(REMOVE_VIEW_MESSAGE, (_, id) => {
        if (!id) return;

        state.dispatch(removeView(id));
    });
};
