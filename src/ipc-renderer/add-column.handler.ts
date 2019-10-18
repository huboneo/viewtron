import {ipcRenderer} from 'electron';

import {VIEW_ADD_COLUMN_MESSAGE} from '../constants';
import {AddColumnData} from '../types';

export default function addColumnHandler(data: AddColumnData) {
    ipcRenderer.send(VIEW_ADD_COLUMN_MESSAGE, data);
}
