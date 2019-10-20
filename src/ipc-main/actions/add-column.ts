import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import { find } from 'lodash';

type AddColumnPayload = { id: string, rowId: string, name?: string, width?: number };

export type AddColumnAction = AppActionMould<'ADD_COLUMN', AddColumnPayload>

export const [addColumn] = actionCreatorFactory<AddColumnAction>({
    type: 'ADD_COLUMN',
    reducer(state, payload) {
        const {rowId} = payload;
        const {rows} = state;
        const row = find(rows, ({id}) => id === rowId);

        if (!row) return state;

        return {
            ...state,
            columns: [
                ...state.columns,
                payload
            ]
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
