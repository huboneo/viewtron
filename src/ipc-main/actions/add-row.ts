import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';

import {Row} from '../../types';
import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type AddRowPayload = Row;

export type AddRowAction = AppActionMould<'ADD_ROW', AddRowPayload>

export const [addRow] = actionCreatorFactory<AddRowAction>({
    type: 'ADD_ROW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {windowId} = payload;

            if (!draft.activeWindows[windowId]) return;

            draft.rows.push(payload);
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
