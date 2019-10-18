import {actionCreatorFactory} from 'conduxion';
import {BrowserWindow} from 'electron';

import {AppActionMould} from '../state';

type SetMainWindowPayload = BrowserWindow

export type SetMainWindowAction = AppActionMould<'SET_MAIN_WINDOW', SetMainWindowPayload>

export const [setMainWindow] = actionCreatorFactory<SetMainWindowAction>({
    type: 'SET_MAIN_WINDOW',
    reducer(state, payload) {
        return {
            ...state,
            mainWindow: payload
        }
    }
});
