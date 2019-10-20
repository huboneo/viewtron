import {ipcRenderer} from 'electron';

import {REMOVE_VIEW_MESSAGE} from '../constants';
import {RemoveViewData} from '../types';

export default function removeViewHandler(data: RemoveViewData) {
    ipcRenderer.send(REMOVE_VIEW_MESSAGE, data);
}
