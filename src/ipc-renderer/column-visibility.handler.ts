import {ipcRenderer} from 'electron';

import {ColumnVisibilityData} from '../types';

import {SET_COLUMN_VISIBILITY_MESSAGE} from '../constants';

export default function columnVisibilityHandler(data: ColumnVisibilityData) {
    // @ts-ignore
    ipcRenderer.send(SET_COLUMN_VISIBILITY_MESSAGE, data);
}
