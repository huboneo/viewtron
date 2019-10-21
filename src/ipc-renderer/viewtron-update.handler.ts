import {ipcRenderer} from 'electron';

import {ViewtronUpdateData} from '../types';

import {VIEWTRON_UPDATE_MESSAGE} from '../constants';

export default function viewtronUpdateHandler(callback: (update: ViewtronUpdateData) => void) {
    ipcRenderer.on(VIEWTRON_UPDATE_MESSAGE, (_, update: ViewtronUpdateData) => callback(update));
}
