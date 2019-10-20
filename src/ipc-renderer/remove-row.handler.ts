import {ipcRenderer} from 'electron';

import {VIEW_REMOVE_ROW_MESSAGE} from '../constants';
import {RemoveRowData} from '../types';

export default function removeRowHandler(data: RemoveRowData) {
    ipcRenderer.send(VIEW_REMOVE_ROW_MESSAGE, data);
}
