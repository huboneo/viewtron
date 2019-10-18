import {ipcRenderer} from 'electron';

import {REMOVE_VIEW_MESSAGE} from '../constants';

export default function removeViewHandler(id: string) {
    ipcRenderer.send(REMOVE_VIEW_MESSAGE, id);
}
