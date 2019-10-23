import {ipcRenderer} from 'electron';

import {AddColumnData} from '../types';

import {ADD_COLUMN_MESSAGE} from '../constants';

export default function addColumnHandler(data: AddColumnData) {
    ipcRenderer.send(ADD_COLUMN_MESSAGE, data);
}
