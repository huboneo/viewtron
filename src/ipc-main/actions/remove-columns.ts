import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {removeViews} from './remove-views';

type RemoveColumnsPayload = { windowId: string, columnIds: string[] };

export type RemoveColumnsAction = AppActionMould<'REMOVE_COLUMNS', RemoveColumnsPayload>

export const [removeColumns] = actionCreatorFactory<RemoveColumnsAction>({
    type: 'REMOVE_COLUMNS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {columns} = draft;
            const {columnIds} = payload;

            draft.columns = filter(columns, ({id}) => !includes(columnIds, id));
        });
    },
    consequence({dispatch, getState, action}) {
        const {windowId, columnIds} = action.payload;
        const {views} = getState();
        const columnViews = filter(
            views,
            ({columnId}) => includes(columnIds, columnId)
        );

        dispatch(removeViews({windowId, viewIds: map(columnViews, 'id')}));
    }
});
