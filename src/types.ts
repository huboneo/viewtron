import {Rectangle} from 'electron';
import {Row} from './ipc-main/state';

export type ViewtronConfig = {
    spacing: number,
    minWidth: number,
    minHeight: number,
    responsive: boolean,
}

export type ViewtronViews = {
    id: string;
    url: string;
    name?: string;
    columnIndex: number;
    rowIndex: number;
    rect?: Rectangle;
    height?: number;
    options?: any
}

export type AddColumnData = {
    rowIndex: number,
    name?: string,
    width?: number
}

export type RemoveColumnData = {
    rowIndex: number,
    columnIndex: number
}

export type AddRowData = {
    name?: string,
    height?: number
}

export type AddViewData = {
    url: string,
    columnIndex: number,
    rowIndex: number,
    name?: string
}

export type ColumnResizeData = {
    columnIndex: number,
    rowIndex: number,
    width: number
}

export type RowResizeData = {
    rowIndex: number,
    height: number
}

export type ViewResizeData = {
    id: string,
    height: number
}

export type ViewtronUpdateData = {
    rows: Row[]
    views: ViewtronViews[];
}
