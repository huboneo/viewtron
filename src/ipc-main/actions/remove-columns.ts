import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {removeViews} from './remove-views';

type RemoveColumnPayload = { windowId: string, columnIds: string[] };

export type RemoveColumnAction = AppActionMould<'REMOVE_COLUMN', RemoveColumnPayload>

export const [removeColumns] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_COLUMN',
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
