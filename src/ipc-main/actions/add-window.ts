import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';

import {AppActionMould} from '../state';
import {ViewtronWindow} from '../../types';

type AddWindowPayload = ViewtronWindow

export type AddWindowAction = AppActionMould<'ADD_WINDOW', AddWindowPayload>

export const [addWindow] = actionCreatorFactory<AddWindowAction>({
    type: 'ADD_WINDOW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            draft.activeWindows[payload.id] = payload;
        });
    }
});
