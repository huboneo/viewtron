import {ipcRenderer} from 'electron';
import {throttle} from 'lodash';

import {SET_ROW_OVERRIDE_OVERRIDE_MESSAGE} from '../constants';

import {RowResizeData} from '../types';

const throttledEmitter = throttle(({rowIndex, height}: RowResizeData) => {
    // @ts-ignore
    ipcRenderer.send(SET_ROW_OVERRIDE_OVERRIDE_MESSAGE, {rowIndex, height});
}, 100);

export default function rowResizeHandler({rowIndex, height}: RowResizeData) {
    throttledEmitter({rowIndex, height});
}
