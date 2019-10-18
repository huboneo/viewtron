import {ipcRenderer} from 'electron';

import {VIEW_REMOVE_ROW_MESSAGE} from '../constants';

export default function removeRowHandler(rowIndex: number) {
    ipcRenderer.send(VIEW_REMOVE_ROW_MESSAGE, rowIndex);
}
