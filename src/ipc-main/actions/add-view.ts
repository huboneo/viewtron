import {BrowserView} from 'electron';
import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {some} from 'lodash';

import {AppActionMould} from '../state';
import {ViewtronView} from '../../types';

import {getOverrideValue} from '../utils';

type AddViewPayload = Omit<ViewtronView, 'instance'>

export type AddViewAction = AppActionMould<'ADD_VIEW', AddViewPayload>

export const [addView] = actionCreatorFactory<AddViewAction>({
    type: 'ADD_VIEW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, columns} = draft;
            const {windowId, columnId, url, height} = payload;
            const columnExits = some(columns, ({id}) => id === columnId);
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect || !columnExits) return;

            const {instance} = draft.activeWindows[windowId];
            const viewInstance = new BrowserView();

            instance.addBrowserView(viewInstance);
            viewInstance.webContents.loadURL(url);

            draft.views.push({
                ...payload,
                instance: viewInstance,
                height: height
                    ? getOverrideValue(config, rect.height, height)
                    : undefined
            });
        });
    }
});
