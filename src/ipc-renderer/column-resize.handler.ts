import {ipcRenderer} from 'electron';
import {throttle} from 'lodash';

import {ColumnResizeData} from '../types';

import {SET_COLUMN_WIDTH_OVERRIDE_MESSAGE} from '../constants';

const throttledEmitter = throttle((data: ColumnResizeData) => {
    // @ts-ignore
    ipcRenderer.send(SET_COLUMN_WIDTH_OVERRIDE_MESSAGE, data);
}, 100, {leading: true, trailing: true});

export default function columnResizeHandler(data: ColumnResizeData) {
    throttledEmitter(data);
}
