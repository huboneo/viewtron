import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {removeColumns} from './remove-columns';

type RemoveColumnPayload = { windowId: string, rowIds: string[] };

export type RemoveColumnAction = AppActionMould<'REMOVE_ROW', RemoveColumnPayload>

export const [removeRows] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_ROW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rows} = draft;
            const {rowIds} = payload;

            draft.rows = filter(rows, ({id}) => !includes(rowIds, id))
        });
    },
    consequence({dispatch, getState, action}) {
        const {windowId, rowIds} = action.payload;
        const {columns} = getState();
        const rowColumns = filter(columns, ({rowId}) => includes(rowIds, rowId));

        dispatch(removeColumns({windowId, columnIds: map(rowColumns, 'id')}));
    }
});
