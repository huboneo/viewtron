import {ipcRenderer} from 'electron';
import {throttle} from 'lodash';

import {RowResizeData} from '../types';

import {SET_ROW_HEIGHTS_OVERRIDE_MESSAGE} from '../constants';

const throttledEmitter = throttle(({rowId, height}: RowResizeData) => {
    // @ts-ignore
    ipcRenderer.send(SET_ROW_HEIGHTS_OVERRIDE_MESSAGE, {rowId, height});
}, 100);

export default function rowResizeHandler({rowId, height}: RowResizeData) {
    throttledEmitter({rowId, height});
}
