import {ipcRenderer} from 'electron';

import {AddViewData} from '../types';

import {ADD_VIEW_MESSAGE} from '../constants';

export default function addViewHandler(data: AddViewData) {
    ipcRenderer.send(ADD_VIEW_MESSAGE, data);
}
