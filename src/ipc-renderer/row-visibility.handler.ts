import {ipcRenderer} from 'electron';

import {RowVisibilityData} from '../types';

import {SET_ROW_VISIBILITY_MESSAGE} from '../constants';

export default function rowVisibilityHandler(data: RowVisibilityData) {
    // @ts-ignore
    ipcRenderer.send(SET_ROW_VISIBILITY_MESSAGE, data);
}
