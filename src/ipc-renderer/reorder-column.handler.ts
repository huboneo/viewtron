import {ipcRenderer} from 'electron';

import {ReorderColumnData} from '../types';

import {REORDER_COLUMN_MESSAGE} from '../constants';

export default function reorderColumnHandler(data: ReorderColumnData) {
    ipcRenderer.send(REORDER_COLUMN_MESSAGE, data);
}
