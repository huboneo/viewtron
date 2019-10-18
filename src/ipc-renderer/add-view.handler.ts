import {ipcRenderer} from 'electron';

import {ADD_VIEW_MESSAGE} from '../constants';

export default function addViewHandler(url: string) {
    ipcRenderer.send(ADD_VIEW_MESSAGE, url);
}
