import {ipcRenderer, Rectangle} from 'electron';

import {VIEWTRON_INIT_MESSAGE} from '../constants';

export default function viewtronInitHandler(viewtronAreaRect: Rectangle) {
    // @ts-ignore
    ipcRenderer.send(VIEWTRON_INIT_MESSAGE, viewtronAreaRect);
}
