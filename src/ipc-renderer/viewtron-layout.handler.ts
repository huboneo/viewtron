import {ipcRenderer} from 'electron';

import {SetLayoutData} from '../types';

import {VIEWTRON_SET_LAYOUT_MESSAGE} from '../constants';

export default function viewtronLayoutHandler(data: SetLayoutData) {
    // @ts-ignore
    ipcRenderer.send(VIEWTRON_SET_LAYOUT_MESSAGE, data);
}
