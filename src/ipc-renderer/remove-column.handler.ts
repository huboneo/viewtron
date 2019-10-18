import {ipcRenderer} from 'electron';

import {RemoveColumnData} from '../types';

import {VIEW_REMOVE_COLUMN_MESSAGE} from '../constants';

export default function removeColumnHandler(data: RemoveColumnData) {
    ipcRenderer.send(VIEW_REMOVE_COLUMN_MESSAGE, data);
}
