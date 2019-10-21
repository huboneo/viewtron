import {actionCreatorFactory} from 'conduxion';
import { filter, includes, map } from 'lodash';

import {AppActionMould} from '../state';

import {removeColumns} from './remove-columns';

type RemoveColumnPayload = { rowIds: string[] };

export type RemoveColumnAction = AppActionMould<'REMOVE_ROW', RemoveColumnPayload>

export const [removeRows] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_ROW',
    reducer(state, payload) {
        const {rowIds} = payload;
        const {rows} = state;

        return {
            ...state,
            rows: filter(rows, ({id}) => !includes(rowIds, id))
        }
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {columns} = getState();
        const rowColumns = filter(columns, ({rowId}) => includes(payload.rowIds, rowId));

        dispatch(removeColumns({columnIds: map(rowColumns, 'id')}));
    }
});
