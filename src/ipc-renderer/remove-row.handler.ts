import {ipcRenderer} from 'electron';

import {RemoveRowData} from '../types';

import {REMOVE_ROW_MESSAGE} from '../constants';

export default function removeRowHandler(data: RemoveRowData) {
    ipcRenderer.send(REMOVE_ROW_MESSAGE, data);
}
