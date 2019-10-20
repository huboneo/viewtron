import {BrowserView} from 'electron';
import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {ViewtronView} from '../../types';

type AddViewPayload = ViewtronView

export type AddViewAction = AppActionMould<'ADD_VIEW', AddViewPayload>

export const [addView] = actionCreatorFactory<AddViewAction>({
    type: 'ADD_VIEW',
    reducer(state, payload) {
        const {mainWindow, views} = state;
        const {id, url} = payload;

        if (!mainWindow) return state;

        const view = new BrowserView();

        mainWindow.addBrowserView(view);
        view.webContents.loadURL(url);

        return {
            ...state,
            views: [
                ...views,
                 payload
            ],
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
