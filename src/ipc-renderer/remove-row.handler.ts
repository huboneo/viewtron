import {ipcRenderer} from 'electron';

import {RemoveRowData} from '../types';

import {VIEW_REMOVE_ROW_MESSAGE} from '../constants';

export default function removeRowHandler(data: RemoveRowData) {
    ipcRenderer.send(VIEW_REMOVE_ROW_MESSAGE, data);
}
