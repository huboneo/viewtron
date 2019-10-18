import {ipcRenderer} from 'electron';

import {VIEW_AREA_RESIZE_MESSAGE} from '../constants';

export default function appAreaResizeHandler(appAreaElem: HTMLElement) {
    // @ts-ignore
    ipcRenderer.send(VIEW_AREA_RESIZE_MESSAGE, appAreaElem.getBoundingClientRect().toJSON());
}
