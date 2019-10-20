import {Rectangle} from 'electron';
import {Column, Row} from './ipc-main/state';

export type ViewtronConfig = {
    spacing: number,
    minWidth: number,
    minHeight: number,
    responsive: boolean,
}

export type ViewtronView = {
    id: string;
    url: string;
    name?: string;
    columnId: string;
    rect?: Rectangle;
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
    id: string
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
    id: string,
    height: number
}

export type ViewtronUpdateData = {
    rows: Row[]
    columns: Column[]
    views: ViewtronView[]
}
