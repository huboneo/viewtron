import {ipcRenderer} from 'electron';

import {ADD_VIEW_MESSAGE} from '../constants';

export default function addViewHandler(path: string) {
    ipcRenderer.send(ADD_VIEW_MESSAGE, path);
}
