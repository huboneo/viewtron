import {ipcRenderer} from 'electron';

import {RemoveViewData} from '../types';

import {REMOVE_VIEW_MESSAGE} from '../constants';

export default function removeViewHandler(data: RemoveViewData) {
    ipcRenderer.send(REMOVE_VIEW_MESSAGE, data);
}
