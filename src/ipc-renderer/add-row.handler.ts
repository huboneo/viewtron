import {ipcRenderer} from 'electron';

import {AddRowData} from '../types';

import {ADD_ROW_MESSAGE} from '../constants';

export default function addRowHandler(data: AddRowData) {
    ipcRenderer.send(ADD_ROW_MESSAGE, data);
}
