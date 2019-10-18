import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type AddRowPayload = { name?: string, height?: number };

export type AddRowAction = AppActionMould<'ADD_ROW', AddRowPayload>

export const [addRow] = actionCreatorFactory<AddRowAction>({
    type: 'ADD_ROW',
    reducer(state, payload) {
        const {rows} = state;

        return {
            ...state,
            rows: [
                ...rows,
                {...payload, columns: []}
            ]
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
