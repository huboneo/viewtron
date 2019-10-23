import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, findIndex, concat, find} from 'lodash';

import {AppActionMould} from '../state';

import {reorderItems} from '../utils';
import {updateViews} from './update-views';

type ReorderViewPayload = { windowId: string, viewId: string, newIndex: number };

export type ReorderViewAction = AppActionMould<'REORDER_VIEW', ReorderViewPayload>

export const [reorderView] = actionCreatorFactory<ReorderViewAction>({
    type: 'REORDER_VIEW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {views} = draft;
            const {viewId, newIndex} = payload;
            const viewToMove = find(views, ({id}) => id === viewId);

            if (!viewToMove) return;

            const columnGroup = filter(views, (view) => view.columnId === viewToMove.columnId);
            const oldIndex = findIndex(columnGroup, ({id}) => id === viewId);

            draft.views = concat(
                filter(views, (view) => view.columnId !== viewToMove.columnId),
                reorderItems(
                    columnGroup,
                    oldIndex,
                    newIndex
                )
            );
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
