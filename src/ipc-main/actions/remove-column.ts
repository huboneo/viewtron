import {actionCreatorFactory} from 'conduxion';
import {filter, values, forEach} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {removeView} from './remove-view';

type RemoveColumnPayload = { rowIndex: number, columnIndex: number };

export type RemoveColumnAction = AppActionMould<'REMOVE_COLUMN', RemoveColumnPayload>

export const [removeColumn] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_COLUMN',
    reducer(state, payload) {
        const {rows} = state;
        const {rowIndex, columnIndex} = payload;

        if (!rows[rowIndex] || !rows[rowIndex].columns[columnIndex]) return state;

        // @todo: immer
        rows[rowIndex].columns = filter(rows[rowIndex].columns, (_, index) => index !== columnIndex);

        return state;
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {viewOptions} = getState();
        const views = filter(
            values(viewOptions),
            ({rowIndex, columnIndex}) => columnIndex === payload.columnIndex && rowIndex === payload.rowIndex
        );

        // @todo: cleanup
        forEach(views, ({id}) => dispatch(removeView(id)));

        dispatch(updateViews());
    }
});
