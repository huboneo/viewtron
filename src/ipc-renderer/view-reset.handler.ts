import {ipcRenderer} from 'electron';

import {RESET_VIEW_HEIGHTS_MESSAGE} from '../constants';

export default function viewResetHandler(id?: string) {
    // @ts-ignore
    ipcRenderer.send(RESET_VIEW_HEIGHTS_MESSAGE, {id});
}
