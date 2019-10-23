import {ipcRenderer} from 'electron';

import {RemoveColumnData} from '../types';

import {REMOVE_COLUMN_MESSAGE} from '../constants';

export default function removeColumnHandler(data: RemoveColumnData) {
    ipcRenderer.send(REMOVE_COLUMN_MESSAGE, data);
}
