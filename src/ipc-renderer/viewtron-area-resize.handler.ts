import {ipcRenderer, Rectangle} from 'electron';

import {VIEW_AREA_RESIZE_MESSAGE} from '../constants';

export default function viewtronAreaResizeHandler(appAreaRect: Rectangle) {
    // @ts-ignore
    ipcRenderer.send(VIEW_AREA_RESIZE_MESSAGE, appAreaRect);
}
