import {ipcRenderer} from 'electron';
import {throttle} from 'lodash';

import {ViewResizeData} from '../types';

import {SET_VIEW_HEIGHT_OVERRIDE_MESSAGE} from '../constants';

const throttledEmitter = throttle((data: ViewResizeData) => {
    // @ts-ignore
    ipcRenderer.send(SET_VIEW_HEIGHT_OVERRIDE_MESSAGE, data);
}, 100);

export default function viewResizeHandler(data: ViewResizeData) {
    throttledEmitter(data);
}
