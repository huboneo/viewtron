import {ipcRenderer} from 'electron';
import {throttle} from 'lodash';

import {ViewResizeData} from '../types';

import {SET_VIEW_HEIGHT_OVERRIDE_MESSAGE} from '../constants';

const throttledEmitter = throttle(({id, height}: ViewResizeData) => {
    // @ts-ignore
    ipcRenderer.send(SET_VIEW_HEIGHT_OVERRIDE_MESSAGE, {id, height});
}, 100);

export default function viewResizeHandler({id, height}: ViewResizeData) {
    throttledEmitter({id, height});
}
