import {ipcRenderer} from 'electron';

import {ColumnResetData} from '../types';

import {RESET_COLUMN_WIDTHS_MESSAGE} from '../constants';

export default function columnResetHandler(data: ColumnResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_COLUMN_WIDTHS_MESSAGE, data);
}
