import {ipcRenderer, Rectangle} from 'electron';
import {throttle} from 'lodash';

import {SET_VIEW_RECT_OVERRIDE_MESSAGE} from '../constants';

const throttledEmitter = throttle((id: string, rect: Rectangle) => {
    // @ts-ignore
    ipcRenderer.send(SET_VIEW_RECT_OVERRIDE_MESSAGE, {id, rect});
}, 100);

export default function viewResizeHandler(id: string, rect: Rectangle) {
    throttledEmitter(id, rect);
}
