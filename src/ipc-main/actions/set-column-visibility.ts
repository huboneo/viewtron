import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {setViewVisibility} from './set-view-visibility';

type SetColumnVisibilityPayload = { windowId: string, columnIds: string[], visible: boolean };

export type SetColumnVisibilityAction = AppActionMould<'SET_COLUMN_VISIBILITY', SetColumnVisibilityPayload>

export const [setColumnVisibility] = actionCreatorFactory<SetColumnVisibilityAction>({
    type: 'SET_COLUMN_VISIBILITY',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {columns} = draft;
            const {columnIds, visible} = payload;

            draft.columns = map(columns, (column) => includes(columnIds, column.id)
                ? {...column, hidden: !visible}
                : column
            );
        });
    },
    consequence({dispatch, getState, action}) {
        const {windowId, columnIds, visible} = action.payload;
        const {views} = getState();
        const columnViews = filter(
            views,
            ({columnId}) => includes(columnIds, columnId)
        );

        dispatch(setViewVisibility({windowId, viewIds: map(columnViews, 'id'), visible}));
    }
});
