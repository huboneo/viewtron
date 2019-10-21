import {actionCreatorFactory} from 'conduxion';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {removeViews} from './remove-views';

type RemoveColumnPayload = { columnIds: string[] };

export type RemoveColumnAction = AppActionMould<'REMOVE_COLUMN', RemoveColumnPayload>

export const [removeColumns] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_COLUMN',
    reducer(state, payload) {
        const {columns} = state;
        const {columnIds} = payload;

        return {
            ...state,
            columns: filter(columns, ({id}) => !includes(columnIds, id))
        };
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {views} = getState();
        const columnViews = filter(
            views,
            ({columnId}) => includes(payload.columnIds, columnId)
        );

        dispatch(removeViews({viewIds: map(columnViews, 'id')}));
    }
});
