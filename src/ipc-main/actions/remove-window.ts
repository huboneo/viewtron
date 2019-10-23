import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {omit, map, filter} from 'lodash';

import {AppActionMould} from '../state';

import {removeRows} from './remove-rows';

type RemoveWindowPayload = { windowId: string }

export type RemoveWindowAction = AppActionMould<'REMOVE_WINDOW', RemoveWindowPayload>

export const [removeWindow] = actionCreatorFactory<RemoveWindowAction>({
    type: 'REMOVE_WINDOW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            draft.activeWindows = omit(draft.activeWindows, payload.windowId)
        });
    },
    consequence({dispatch, getState, action}) {
        const {windowId} = action.payload;
        const {rows} = getState();
        const windowRows = filter(rows, (row) => row.windowId === windowId);

        dispatch(removeRows({windowId, rowIds: map(windowRows, 'id')}));
    }
});
