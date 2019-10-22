import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {some} from 'lodash';

import {AppActionMould} from '../state';
import {Column} from '../../types';

import {updateViews} from './update-views';

type AddColumnPayload = Column;

export type AddColumnAction = AppActionMould<'ADD_COLUMN', AddColumnPayload>

export const [addColumn] = actionCreatorFactory<AddColumnAction>({
    type: 'ADD_COLUMN',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rowId} = payload;
            const {rows} = draft;
            const rowExists = some(rows, ({id}) => id === rowId);

            if (!rowExists) return;

            draft.columns.push(payload);
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
