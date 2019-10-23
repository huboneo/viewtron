import {Store} from 'redux';
import {BrowserView, BrowserWindow, Rectangle} from 'electron';

import {AppAction, AppState} from './ipc-main/state';

export type ViewtronInstance = {
    viewtronWindow: ViewtronWindow,
    state: Store<AppState, AppAction>,
    removeViewtron: () => void,
}

export type ViewtronWindow = {
    id: string,
    instance: BrowserWindow,
    rect?: Rectangle,
    config: ViewtronConfig
}

export type Column = {
    id: string,
    windowId: string;
    rowId: string,
    name?: string,
    width?: number
};

export type Row = {
    id: string,
    windowId: string;
    name?: string,
    height?: number
};

export type ViewtronConfig = {
    spacing: number,
    minWidth: number,
    minHeight: number,
    responsive: boolean,
    destroyOnClose: boolean,
}

export type ViewtronView = {
    id: string;
    url: string;
    name?: string;
    windowId: string;
    columnId: string;
    rect?: Rectangle;
    instance: BrowserView;
    height?: number;
    options?: any
}

export type AddColumnData = {
    rowId: string,
    name?: string,
    width?: number
}

export type RemoveColumnData = {
    columnId: string
}

export type AddRowData = {
    name?: string,
    height?: number
}

export type RemoveRowData = {
    rowId: string
}

export type AddViewData = {
    url: string,
    columnId: string
    name?: string
}

export type RemoveViewData = {
    viewId: string
}

export type RowResetData = {
    rowIds?: string[]
}

export type ColumnResetData = {
    columnIds?: string[]
}

export type ViewResetData = {
    viewIds?: string[]
}

export type ColumnResizeData = {
    columnId: string
    width: number
}

export type RowResizeData = {
    rowId: string,
    height: number
}

export type ViewResizeData = {
    viewId: string,
    height: number
}

export type ViewtronUpdateData = {
    rows: Row[]
    columns: Column[]
    views: ViewtronView[]
}
