import {ipcRenderer} from 'electron';

import {RESET_VIEW_HEIGHTS_MESSAGE} from '../constants';
import {ViewResetData} from '../types';

export default function viewResetHandler(data: ViewResetData) {
    // @ts-ignore
    ipcRenderer.send(RESET_VIEW_HEIGHTS_MESSAGE, data);
}
