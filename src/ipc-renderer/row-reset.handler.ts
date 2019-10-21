import {ipcRenderer} from 'electron';

import {RESET_ROW_HEIGHTS_MESSAGE} from '../constants';
import {RowResetData} from '../types';

export default function rowResetHandler(data: RowResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_ROW_HEIGHTS_MESSAGE, data);
}
