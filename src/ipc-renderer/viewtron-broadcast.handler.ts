import {ipcRenderer} from 'electron';

import {BroadcastData} from '../types';

import {VIEWTRON_BROADCAST_MESSAGE} from '../constants';

export default function viewtronBroadcastHandler(data: BroadcastData) {
    ipcRenderer.send(VIEWTRON_BROADCAST_MESSAGE, data);
}
