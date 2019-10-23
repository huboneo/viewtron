import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {setColumnVisibility} from './set-column-visibility';

type SetRowVisibilityPayload = { windowId: string, rowIds: string[], visible: boolean };

export type SetRowVisibilityAction = AppActionMould<'SET_ROW_VISIBILITY', SetRowVisibilityPayload>

export const [setRowVisibility] = actionCreatorFactory<SetRowVisibilityAction>({
    type: 'SET_ROW_VISIBILITY',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rows} = draft;
            const {rowIds, visible} = payload;

            draft.rows = map(rows, (row) => includes(rowIds, row.id)
                ? {...row, hidden: !visible}
                : row
            )
        });
    },
    consequence({dispatch, getState, action}) {
        const {windowId, rowIds, visible} = action.payload;
        const {columns} = getState();
        const rowColumns = filter(columns, ({rowId}) => includes(rowIds, rowId));

        dispatch(setColumnVisibility({windowId, columnIds: map(rowColumns, 'id'), visible}));
    }
});
