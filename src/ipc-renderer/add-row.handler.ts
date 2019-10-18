import {ipcRenderer} from 'electron';

import {AddRowData} from '../types';

import {VIEW_ADD_ROW_MESSAGE} from '../constants';

export default function addRowHandler(data: AddRowData) {
    ipcRenderer.send(VIEW_ADD_ROW_MESSAGE, data);
}
