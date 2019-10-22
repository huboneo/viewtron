import {BrowserWindow, ipcMain,} from 'electron';
import uuid from 'uuid/v4';
import {assign} from 'lodash';

import {addWindow} from './actions/add-window';
import {removeWindow} from './actions/remove-window';
import {addView} from './actions/add-view';
import {removeViews} from './actions/remove-views';
import {setWindowRect} from './actions/set-window-rect';
import {setViewHeightOverride} from './actions/set-view-height-override';
import {resetViewHeights} from './actions/reset-view-heights';
import {addColumn} from './actions/add-column';
import {removeColumns} from './actions/remove-columns';
import {setColumnWidthOverride} from './actions/set-column-width-override';
import {addRow} from './actions/add-row';
import {removeRows} from './actions/remove-rows';
import {setRowHeightOverride} from './actions/set-row-height-override';
import {resetColumnWidths} from './actions/reset-column-widths';
import {resetRowHeights} from './actions/reset-row-heights';

import {
    ADD_VIEW_MESSAGE,
    SET_VIEW_HEIGHT_OVERRIDE_MESSAGE,
    REMOVE_VIEW_MESSAGE,
    RESET_VIEW_HEIGHTS_MESSAGE,
    VIEWTRON_INIT_MESSAGE,
    VIEWTRON_RESIZE_MESSAGE,
    VIEW_ADD_COLUMN_MESSAGE,
    VIEW_REMOVE_COLUMN_MESSAGE,
    SET_COLUMN_WIDTHS_OVERRIDE_MESSAGE,
    VIEW_ADD_ROW_MESSAGE,
    SET_ROW_HEIGHTS_OVERRIDE_MESSAGE,
    VIEW_REMOVE_ROW_MESSAGE,
    DEFAULT_CONFIG,
    RESET_COLUMN_WIDTHS_MESSAGE,
    RESET_ROW_HEIGHTS_MESSAGE
} from '../constants';

import {
    AddColumnData,
    AddRowData,
    AddViewData,
    ColumnResetData,
    ColumnResizeData,
    RemoveColumnData,
    RemoveRowData,
    RemoveViewData,
    RowResetData,
    RowResizeData,
    ViewResetData,
    ViewResizeData,
    ViewtronConfig,
    ViewtronInstance,
    ViewtronWindow
} from '../types';

import state from './state';

export function addViewtron(mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}): ViewtronInstance {
    /**
     * Main window handlers
     */
    const windowId = uuid();
    const activeWindow: ViewtronWindow = {
        id: windowId,
        instance: mainWindow,
        config: assign({}, DEFAULT_CONFIG, config)
    };

    state.dispatch(addWindow(activeWindow));

    mainWindow.on('close', () => {
        if (!config.destroyOnClose) return;

        state.dispatch(removeWindow({windowId}))
    });

    /**
     * Viewtron area handlers
     */
    ipcMain.on(VIEWTRON_INIT_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setWindowRect({windowId, rect}));
    });

    ipcMain.on(VIEWTRON_RESIZE_MESSAGE, (_, rect) => {
        if (!rect) return;

        state.dispatch(setWindowRect({windowId, rect}));
    });

    /**
     * Viewtron instance handlers
     */
    ipcMain.on(VIEW_ADD_ROW_MESSAGE, (_, {name, height}: AddRowData) => {
        state.dispatch(addRow({windowId, id: uuid(), name, height}));
    });

    ipcMain.on(VIEW_REMOVE_ROW_MESSAGE, (_, {rowId}: RemoveRowData) => {
        if (typeof rowId !== 'string') return;

        state.dispatch(removeRows({windowId, rowIds: [rowId]}));
    });

    ipcMain.on(SET_ROW_HEIGHTS_OVERRIDE_MESSAGE, (_, {rowId, height}: RowResizeData) => {
        if (typeof height !== 'number' || typeof rowId !== 'string') return;

        state.dispatch(setRowHeightOverride({windowId, rowId, height}));
    });

    ipcMain.on(RESET_ROW_HEIGHTS_MESSAGE, (_, data: RowResetData) => {
        state.dispatch(resetRowHeights({windowId, ...data}));
    });

    ipcMain.on(VIEW_ADD_COLUMN_MESSAGE, (_, {name, rowId, width}: AddColumnData) => {
        if (typeof rowId !== 'string') return;

        state.dispatch(addColumn({windowId, id: uuid(), name, rowId, width}));
    });

    ipcMain.on(VIEW_REMOVE_COLUMN_MESSAGE, (_, {columnId}: RemoveColumnData) => {
        if (typeof columnId !== 'string') return;

        state.dispatch(removeColumns({windowId, columnIds: [columnId]}));
    });

    ipcMain.on(SET_COLUMN_WIDTHS_OVERRIDE_MESSAGE, (_, {columnId, width}: ColumnResizeData) => {
        if (typeof width !== 'number' || typeof columnId !== 'string') return;

        state.dispatch(setColumnWidthOverride({windowId, columnId, width}));
    });

    ipcMain.on(RESET_COLUMN_WIDTHS_MESSAGE, (_, data: ColumnResetData) => {
        state.dispatch(resetColumnWidths({windowId, ...data}));
    });

    ipcMain.on(ADD_VIEW_MESSAGE, (_, {url, columnId, name}: AddViewData) => {
        if (url === undefined || typeof columnId !== 'string') return;

        state.dispatch(addView({windowId, id: uuid(), url, name, columnId}));
    });

    ipcMain.on(REMOVE_VIEW_MESSAGE, (_, {viewId}: RemoveViewData) => {
        state.dispatch(removeViews({windowId, viewIds: [viewId]}));
    });

    ipcMain.on(SET_VIEW_HEIGHT_OVERRIDE_MESSAGE, (_, {viewId, height}: ViewResizeData) => {
        if (!viewId || typeof height !== 'number') return;

        state.dispatch(setViewHeightOverride({windowId, viewId: viewId, height}));
    });

    ipcMain.on(RESET_VIEW_HEIGHTS_MESSAGE, (_, {viewIds}: ViewResetData) => {
        state.dispatch(resetViewHeights({windowId, viewIds}));
    });

    return {
        viewtronWindow: activeWindow,
        state,
        removeViewtron() {
            state.dispatch(removeWindow({windowId}));
        }
    }
}
