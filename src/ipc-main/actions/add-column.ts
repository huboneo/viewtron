import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type AddColumnPayload = { rowIndex: number, name?: string, width?: number };

export type AddColumnAction = AppActionMould<'ADD_COLUMN', AddColumnPayload>

export const [addColumn] = actionCreatorFactory<AddColumnAction>({
    type: 'ADD_COLUMN',
    reducer(state, payload) {
        const {rowIndex} = payload;
        const {rows} = state;

        if (!rows[rowIndex]) return state;

        // @todo: immer.
        rows[rowIndex].columns = [
            ...rows[rowIndex].columns,
            payload
        ];

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
