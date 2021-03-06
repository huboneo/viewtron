import {ipcRenderer, Rectangle} from 'electron';

import {VIEWTRON_RESIZE_MESSAGE} from '../constants';

export default function viewtronResizeHandler(viewtronAreaRect: Rectangle) {
    // @ts-ignore
    ipcRenderer.send(VIEWTRON_RESIZE_MESSAGE, viewtronAreaRect);
}
