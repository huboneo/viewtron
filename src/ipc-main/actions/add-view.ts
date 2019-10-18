import {BrowserView} from 'electron';
import {actionCreatorFactory} from 'conduxion';

import {AppActionMould, ViewOption} from '../state';

import {updateViews} from './update-views';

type AddViewOptionPayload = ViewOption

export type AddViewOptionAction = AppActionMould<'ADD_VIEW', AddViewOptionPayload>

export const [addView] = actionCreatorFactory<AddViewOptionAction>({
    type: 'ADD_VIEW',
    reducer(state, payload) {
        const {mainWindow, viewOptions} = state;
        const {id, path} = payload;

        if (!mainWindow || viewOptions[id]) return state;

        const view = new BrowserView();

        mainWindow.addBrowserView(view);
        view.webContents.loadURL(path);

        return {
            ...state,
            viewOptions: {
                ...viewOptions,
                [id]: payload
            },
            activeViews: {
                ...state.activeViews,
                [id]: view
            }
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
