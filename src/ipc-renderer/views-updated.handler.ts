import {ipcRenderer} from 'electron';

import {VIEWS_UPDATED_MESSAGE} from '../constants';
import {ViewOption} from '../ipc-main/state';

export default function viewsUpdatedHandler(callback: (views: ViewOption[]) => void) {
    ipcRenderer.on(VIEWS_UPDATED_MESSAGE, (_, views: ViewOption[]) => callback(views));
}
