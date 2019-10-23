import {ipcRenderer} from 'electron';

import {ViewVisibilityData} from '../types';

import {SET_VIEW_VISIBILITY_MESSAGE} from '../constants';

export default function viewVisibilityHandler(data: ViewVisibilityData) {
    // @ts-ignore
    ipcRenderer.send(SET_VIEW_VISIBILITY_MESSAGE, data);
}
