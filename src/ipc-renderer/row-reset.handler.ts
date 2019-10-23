import {ipcRenderer} from 'electron';

import {RowResetData} from '../types';

import {RESET_ROW_HEIGHTS_MESSAGE} from '../constants';

export default function rowResetHandler(data: RowResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_ROW_HEIGHTS_MESSAGE, data);
}
