import {ipcRenderer} from 'electron';

import {ViewtronUpdateData} from '../types';

import {VIEWS_UPDATED_MESSAGE} from '../constants';

export default function viewsUpdatedHandler(callback: (update: ViewtronUpdateData) => void) {
    ipcRenderer.on(VIEWS_UPDATED_MESSAGE, (_, update: ViewtronUpdateData) => callback(update));
}
