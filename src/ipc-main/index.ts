import {BrowserWindow, ipcMain,} from 'electron';
import uuid from 'uuid/v4';
import {assign} from 'lodash';

import {setConfig} from './actions/set-config';
import {addView} from './actions/add-view';
import {removeView} from './actions/remove-view';
import {setAreaRect} from './actions/set-area-rect';
import {setMainWindow} from './actions/set-main-window';
import {setViewHeightOverride} from './actions/set-view-height-override';
import {resetViewHeights} from './actions/reset-view-heights';
import {addColumn} from './actions/add-column';
import {removeColumn} from './actions/remove-column';
import {setColumnWidthOverride} from './actions/set-column-width-override';
import {addRow} from './actions/add-row';
import {removeRow} from './actions/remove-row';
import {setRowHeightOverride} from './actions/set-row-height-override';

import {
    ADD_VIEW_MESSAGE,
    SET_VIEW_HEIGHT_OVERRIDE_MESSAGE,
    REMOVE_VIEW_MESSAGE,
    RESET_VIEW_HEIGHTS_MESSAGE,
    VIEW_AREA_INIT_MESSAGE,
    VIEW_AREA_RESIZE_MESSAGE,
    VIEW_ADD_COLUMN_MESSAGE,
    VIEW_REMOVE_COLUMN_MESSAGE,
    SET_COLUMN_WIDTH_OVERRIDE_MESSAGE,
    VIEW_ADD_ROW_MESSAGE,
    SET_ROW_OVERRIDE_OVERRIDE_MESSAGE,
    VIEW_REMOVE_ROW_MESSAGE,
    DEFAULT_CONFIG
} from '../constants';

import {
    AddColumnData,
    AddRowData,
    AddViewData,
    ColumnResizeData, RemoveColumnData,
    RowResizeData,
    ViewResizeData,
    ViewtronConfig
} from '../types';

import state from './state';

export const addMainWindowHandlers = (mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}) => {
    state.dispatch(setConfig(assign({}, DEFAULT_CONFIG, config)));
    state.dispatch(setMainWindow(mainWindow));
};

export const addViewtronAreaHandlers = () => {
    ipcMain.on(VIEW_AREA_INIT_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setAreaRect(rect));
    });

    ipcMain.on(VIEW_AREA_RESIZE_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setAreaRect(rect));
    });

    ipcMain.on(VIEW_ADD_COLUMN_MESSAGE, (_, {name, rowIndex, width}: AddColumnData) => {
        if (typeof rowIndex !== 'number') return;

        state.dispatch(addColumn({name, rowIndex, width}));
    });

    ipcMain.on(SET_COLUMN_WIDTH_OVERRIDE_MESSAGE, (_, {columnIndex, rowIndex, width}: ColumnResizeData) => {
        if (typeof width !== 'number' || typeof columnIndex !== 'number' || typeof rowIndex !== 'number') return;

        state.dispatch(setColumnWidthOverride({columnIndex, rowIndex, width}));
    });

    ipcMain.on(VIEW_REMOVE_COLUMN_MESSAGE, (_, {rowIndex, columnIndex}: RemoveColumnData) => {
        if (typeof columnIndex !== 'number' || typeof rowIndex !== 'number') return;

        state.dispatch(removeColumn({rowIndex, columnIndex}));
    });

    ipcMain.on(VIEW_ADD_ROW_MESSAGE, (_, {name, height}: AddRowData) => {
        state.dispatch(addRow({name, height}));
    });

    ipcMain.on(SET_ROW_OVERRIDE_OVERRIDE_MESSAGE, (_, {rowIndex, height}: RowResizeData) => {
        if (typeof height !== 'number' || typeof rowIndex !== 'number') return;

        state.dispatch(setRowHeightOverride({rowIndex, height}));
    });

    ipcMain.on(VIEW_REMOVE_ROW_MESSAGE, (_, rowIndex: number) => {
        if (typeof rowIndex !== 'number') return;

        state.dispatch(removeRow({rowIndex}));
    });
};

export const addViewInstanceHandlers = () => {
    ipcMain.on(ADD_VIEW_MESSAGE, (_, {url, columnIndex, rowIndex, name}: AddViewData) => {
        if (url === undefined || typeof columnIndex !== 'number' || typeof rowIndex !== 'number') return;

        state.dispatch(addView({id: uuid(), url, name, columnIndex, rowIndex}));
    });

    ipcMain.on(SET_VIEW_HEIGHT_OVERRIDE_MESSAGE, (_, {id, height}: ViewResizeData) => {
        if (!id || typeof height !== 'number') return;

        state.dispatch(setViewHeightOverride({id, height}));
    });

    ipcMain.on(RESET_VIEW_HEIGHTS_MESSAGE, (_, {id}) => {
        state.dispatch(resetViewHeights({id}));
    });

    ipcMain.on(REMOVE_VIEW_MESSAGE, (_, id) => {
        if (!id) return;

        state.dispatch(removeView(id));
    });
};
