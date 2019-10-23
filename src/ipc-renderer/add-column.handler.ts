import {ipcRenderer} from 'electron';

import {AddColumnData} from '../types';

import {VIEW_ADD_COLUMN_MESSAGE} from '../constants';

export default function addColumnHandler(data: AddColumnData) {
    ipcRenderer.send(VIEW_ADD_COLUMN_MESSAGE, data);
}
