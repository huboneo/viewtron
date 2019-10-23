import {ipcRenderer} from 'electron';

import {ReorderViewData} from '../types';

import {REORDER_VIEW_MESSAGE} from '../constants';

export default function reorderViewHandler(data: ReorderViewData) {
    ipcRenderer.send(REORDER_VIEW_MESSAGE, data);
}
