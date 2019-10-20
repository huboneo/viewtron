import {actionCreatorFactory} from 'conduxion';
import { filter, forEach } from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {removeColumn} from './remove-column';

type RemoveColumnPayload = { rowId: string };

export type RemoveColumnAction = AppActionMould<'REMOVE_ROW', RemoveColumnPayload>

export const [removeRow] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_ROW',
    reducer(state, payload) {
        const {rowId} = payload;
        const {rows} = state;

        return {
            ...state,
            rows: filter(rows, ({id}) => id !== rowId)
        }
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {columns} = getState();
        const rowColumns = filter(columns, ({rowId}) => rowId === payload.rowId);

        // @todo: cleanup
        forEach(rowColumns, ({id}) => dispatch(removeColumn({columnId: id})));

        dispatch(updateViews());
    }
});
