import {BrowserWindow, ipcMain} from 'electron';
import uuid from 'uuid/v4';
import {assign} from 'lodash';

// window
import {addWindow} from './actions/add-window';
import {removeWindow} from './actions/remove-window';
import {setWindowRect} from './actions/set-window-rect';
import {setLayout} from './actions/set-layout';
import {broadcastToViews} from './actions/broadcast-to-views';
import {updateViews} from './actions/update-views';

// row
import {addRow} from './actions/add-row';
import {removeRows} from './actions/remove-rows';
import {setRowHeightOverride} from './actions/set-row-height-override';
import {setRowVisibility} from './actions/set-row-visibility';
import {reorderRow} from './actions/reorder-row';
import {resetRowHeights} from './actions/reset-row-heights';

// column
import {addColumn} from './actions/add-column';
import {removeColumns} from './actions/remove-columns';
import {setColumnWidthOverride} from './actions/set-column-width-override';
import {resetColumnWidths} from './actions/reset-column-widths';
import {reorderColumn} from './actions/reorder-column';
import {setColumnVisibility} from './actions/set-column-visibility';

// view
import {addView} from './actions/add-view';
import {removeViews} from './actions/remove-views';
import {setViewHeightOverride} from './actions/set-view-height-override';
import {resetViewHeights} from './actions/reset-view-heights';
import {reorderView} from './actions/reorder-view';
import {setViewVisibility} from './actions/set-view-visibility';


import {
    ADD_VIEW_MESSAGE,
    SET_VIEW_HEIGHT_OVERRIDE_MESSAGE,
    REMOVE_VIEW_MESSAGE,
    RESET_VIEW_HEIGHTS_MESSAGE,
    VIEWTRON_INIT_MESSAGE,
    VIEWTRON_RESIZE_MESSAGE,
    ADD_COLUMN_MESSAGE,
    REMOVE_COLUMN_MESSAGE,
    SET_COLUMN_WIDTHS_OVERRIDE_MESSAGE,
    ADD_ROW_MESSAGE,
    SET_ROW_HEIGHTS_OVERRIDE_MESSAGE,
    REMOVE_ROW_MESSAGE,
    DEFAULT_CONFIG,
    RESET_COLUMN_WIDTHS_MESSAGE,
    RESET_ROW_HEIGHTS_MESSAGE,
    SET_ROW_VISIBILITY_MESSAGE,
    SET_COLUMN_VISIBILITY_MESSAGE,
    SET_VIEW_VISIBILITY_MESSAGE,
    REORDER_ROW_MESSAGE,
    REORDER_COLUMN_MESSAGE,
    REORDER_VIEW_MESSAGE,
    VIEWTRON_SET_LAYOUT_MESSAGE, VIEWTRON_BROADCAST_MESSAGE
} from '../constants';

import {
    AddColumnData,
    AddRowData,
    AddViewData, BroadcastData,
    ColumnResetData,
    ColumnResizeData,
    ColumnVisibilityData,
    RemoveColumnData,
    RemoveRowData,
    RemoveViewData,
    ReorderColumnData,
    ReorderRowData,
    ReorderViewData,
    RowResetData,
    RowResizeData,
    RowVisibilityData, SetLayoutData,
    ViewResetData,
    ViewResizeData,
    ViewtronConfig,
    ViewtronInstance,
    ViewtronWindow,
    ViewVisibilityData
} from '../types';

import state from './state';
import Rectangle = Electron.Rectangle;

export function addViewtron(mainWindow: BrowserWindow, config: Partial<ViewtronConfig> = {}): ViewtronInstance {
    const windowId = uuid();
    const activeWindow: ViewtronWindow = {
        id: windowId,
        instance: mainWindow,
        config: assign({}, DEFAULT_CONFIG, config)
    };

    state.dispatch(addWindow(activeWindow));
    state.dispatch(updateViews({windowId}));

    /**
     * Main window handlers
     */
    mainWindow.on('close', () => {
        if (!activeWindow.config.destroyOnClose) return;

        state.dispatch(removeWindow({windowId}));
        state.dispatch(updateViews({windowId}));
    });

    /**
     * Viewtron area handlers
     */
    ipcMain.on(VIEWTRON_INIT_MESSAGE, (_, rect: Rectangle) => {
        if (!rect) return;

        state.dispatch(setWindowRect({windowId, rect}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(VIEWTRON_RESIZE_MESSAGE, (_, rect: Rectangle) => {
        if (!rect) return;

        state.dispatch(setWindowRect({windowId, rect}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(VIEWTRON_SET_LAYOUT_MESSAGE, (_, data: SetLayoutData) => {
        if (!data) return;

        state.dispatch(setLayout({windowId, ...data}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(VIEWTRON_BROADCAST_MESSAGE, (_, data: BroadcastData) => {
        if (!data) return;

        state.dispatch(broadcastToViews({windowId, ...data}));
    });

    /**
     * Viewtron instance handlers
     */
    ipcMain.on(ADD_ROW_MESSAGE, (_, {name, height}: AddRowData) => {
        state.dispatch(addRow({windowId, id: uuid(), name, height}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REMOVE_ROW_MESSAGE, (_, {rowId}: RemoveRowData) => {
        if (typeof rowId !== 'string') return;

        state.dispatch(removeRows({windowId, rowIds: [rowId]}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REORDER_ROW_MESSAGE, (_, {rowId, newIndex}: ReorderRowData) => {
        if (typeof rowId !== 'string' || typeof newIndex !== 'number') return;

        state.dispatch(reorderRow({windowId, rowId, newIndex}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_ROW_HEIGHTS_OVERRIDE_MESSAGE, (_, {rowId, height}: RowResizeData) => {
        if (typeof height !== 'number' || typeof rowId !== 'string') return;

        state.dispatch(setRowHeightOverride({windowId, rowId, height}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_ROW_VISIBILITY_MESSAGE, (_, {rowId, visible}: RowVisibilityData) => {
        if (typeof rowId !== 'string') return;

        state.dispatch(setRowVisibility({windowId, rowIds: [rowId], visible}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(RESET_ROW_HEIGHTS_MESSAGE, (_, data: RowResetData) => {
        state.dispatch(resetRowHeights({windowId, ...data}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(ADD_COLUMN_MESSAGE, (_, {name, rowId, width}: AddColumnData) => {
        if (typeof rowId !== 'string') return;

        state.dispatch(addColumn({windowId, id: uuid(), name, rowId, width}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REMOVE_COLUMN_MESSAGE, (_, {columnId}: RemoveColumnData) => {
        if (typeof columnId !== 'string') return;

        state.dispatch(removeColumns({windowId, columnIds: [columnId]}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REORDER_COLUMN_MESSAGE, (_, {columnId, newIndex}: ReorderColumnData) => {
        if (typeof columnId !== 'string' || typeof newIndex !== 'number') return;

        state.dispatch(reorderColumn({windowId, columnId, newIndex}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_COLUMN_WIDTHS_OVERRIDE_MESSAGE, (_, {columnId, width}: ColumnResizeData) => {
        if (typeof width !== 'number' || typeof columnId !== 'string') return;

        state.dispatch(setColumnWidthOverride({windowId, columnId, width}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_COLUMN_VISIBILITY_MESSAGE, (_, {columnId, visible}: ColumnVisibilityData) => {
        if (typeof columnId !== 'string') return;

        state.dispatch(setColumnVisibility({windowId, columnIds: [columnId], visible}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(RESET_COLUMN_WIDTHS_MESSAGE, (_, data: ColumnResetData) => {
        state.dispatch(resetColumnWidths({windowId, ...data}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(ADD_VIEW_MESSAGE, (_, {url, columnId, name}: AddViewData) => {
        if (typeof url !== 'string' || typeof columnId !== 'string') return;

        state.dispatch(addView({windowId, id: uuid(), url, name, columnId}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REMOVE_VIEW_MESSAGE, (_, {viewId}: RemoveViewData) => {
        if (typeof viewId !== 'string') return;

        state.dispatch(removeViews({windowId, viewIds: [viewId]}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(REORDER_VIEW_MESSAGE, (_, {viewId, newIndex}: ReorderViewData) => {
        if (typeof viewId !== 'string' || typeof newIndex !== 'number') return;

        state.dispatch(reorderView({windowId, viewId, newIndex}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_VIEW_HEIGHT_OVERRIDE_MESSAGE, (_, {viewId, height}: ViewResizeData) => {
        if (!viewId || typeof height !== 'number') return;

        state.dispatch(setViewHeightOverride({windowId, viewId, height}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(SET_VIEW_VISIBILITY_MESSAGE, (_, {viewId, visible}: ViewVisibilityData) => {
        if (!viewId) return;

        state.dispatch(setViewVisibility({windowId, viewIds: [viewId], visible}));
        state.dispatch(updateViews({windowId}));
    });

    ipcMain.on(RESET_VIEW_HEIGHTS_MESSAGE, (_, {viewIds}: ViewResetData) => {
        state.dispatch(resetViewHeights({windowId, viewIds}));
        state.dispatch(updateViews({windowId}));
    });

    return {
        viewtronWindow: activeWindow,
        state,
        removeViewtron() {
            state.dispatch(removeWindow({windowId}));
            state.dispatch(updateViews({windowId}));
        }
    }
}
