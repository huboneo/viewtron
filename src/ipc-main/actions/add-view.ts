import {BrowserView} from 'electron';
import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {some} from 'lodash';

import {AppActionMould} from '../state';
import {ViewtronView} from '../../types';

import {updateViews} from './update-views';

type AddViewPayload = Omit<ViewtronView, 'instance'>

export type AddViewAction = AppActionMould<'ADD_VIEW', AddViewPayload>

export const [addView] = actionCreatorFactory<AddViewAction>({
    type: 'ADD_VIEW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {columns} = draft;
            const {windowId, columnId, url} = payload;
            const columnExits = some(columns, ({id}) => id === columnId);

            if (!columnExits) return;

            const {instance} = draft.activeWindows[windowId];
            const viewInstance = new BrowserView();

            instance.addBrowserView(viewInstance);
            viewInstance.webContents.loadURL(url);

            draft.views.push({
                ...payload,
                instance: viewInstance
            });
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
