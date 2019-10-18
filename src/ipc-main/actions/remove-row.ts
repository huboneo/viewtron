import {actionCreatorFactory} from 'conduxion';
import { filter, values, forEach } from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import { removeView } from './remove-view';

type RemoveColumnPayload = { rowIndex: number };

export type RemoveColumnAction = AppActionMould<'REMOVE_ROW', RemoveColumnPayload>

export const [removeRow] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_ROW',
    reducer(state, payload) {
        const {rows} = state;
        const {rowIndex} = payload;

        if (!rows[rowIndex]) return state;

        const newRows = filter(rows, (_, index) => rowIndex !== index);

        return {
            ...state,
            rows: newRows
        }
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {viewOptions} = getState();
        const views = filter(values(viewOptions), ({rowIndex}) => rowIndex === payload.rowIndex);

        // @todo: cleanup
        forEach(views, ({id}) => dispatch(removeView(id)));

        dispatch(updateViews());
    }
});
