import {BrowserView} from 'electron';
import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {ViewtronViews} from '../../types';

type AddViewOptionPayload = ViewtronViews

export type AddViewOptionAction = AppActionMould<'ADD_VIEW', AddViewOptionPayload>

export const [addView] = actionCreatorFactory<AddViewOptionAction>({
    type: 'ADD_VIEW',
    reducer(state, payload) {
        const {mainWindow, viewOptions} = state;
        const {id, url} = payload;

        if (!mainWindow || viewOptions[id]) return state;

        const view = new BrowserView();

        mainWindow.addBrowserView(view);
        view.webContents.loadURL(url);

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
