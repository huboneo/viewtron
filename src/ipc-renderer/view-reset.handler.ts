import {ipcRenderer} from 'electron';

import {ViewResetData} from '../types';

import {RESET_VIEW_HEIGHTS_MESSAGE} from '../constants';

export default function viewResetHandler(data: ViewResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_VIEW_HEIGHTS_MESSAGE, data);
}
