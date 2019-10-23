import {ipcRenderer} from 'electron';

import {ReorderRowData} from '../types';

import {REORDER_ROW_MESSAGE} from '../constants';

export default function reorderRowHandler(data: ReorderRowData) {
    ipcRenderer.send(REORDER_ROW_MESSAGE, data);
}
