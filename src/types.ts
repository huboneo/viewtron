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
    width?: number,
    hidden?: boolean
};

export type Row = {
    id: string,
    windowId: string;
    name?: string,
    height?: number,
    hidden?: boolean
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
    options?: any,
    hidden?: boolean
}

export type AddRowData = {
    name?: string,
    height?: number
}

export type RemoveRowData = {
    rowId: string
}

export type AddColumnData = {
    rowId: string,
    name?: string,
    width?: number
}

export type RemoveColumnData = {
    columnId: string
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

export type RowResizeData = {
    rowId: string,
    height: number
}

export type ColumnResizeData = {
    columnId: string
    width: number
}

export type ViewResizeData = {
    viewId: string,
    height: number
}

export type RowVisibilityData = {
    rowId: string,
    visible: boolean
}

export type ColumnVisibilityData = {
    columnId: string
    visible: boolean
}

export type ViewVisibilityData = {
    viewId: string,
    visible: boolean
}

export type ViewtronUpdateData = {
    rows: Row[]
    columns: Column[]
    views: ViewtronView[]
}
