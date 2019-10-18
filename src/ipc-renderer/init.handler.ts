import {ipcRenderer} from 'electron';

import {VIEW_AREA_INIT_MESSAGE} from '../constants';

export default function initHandler(appAreaElem: HTMLElement) {
    // @ts-ignore
    ipcRenderer.send(VIEW_AREA_INIT_MESSAGE, appAreaElem.getBoundingClientRect().toJSON());
}
