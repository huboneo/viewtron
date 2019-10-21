import {ipcRenderer} from 'electron';

import {RESET_COLUMN_WIDTHS_MESSAGE} from '../constants';
import {ColumnResetData} from '../types';

export default function columnResetHandler(data: ColumnResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_COLUMN_WIDTHS_MESSAGE, data);
}
