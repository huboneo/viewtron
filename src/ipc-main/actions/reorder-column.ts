import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, findIndex, concat, find} from 'lodash';

import {AppActionMould} from '../state';

import {reorderItems} from '../utils';

type ReorderColumnPayload = { windowId: string, columnId: string, newIndex: number };

export type ReorderColumnAction = AppActionMould<'REORDER_COLUMN', ReorderColumnPayload>

export const [reorderColumn] = actionCreatorFactory<ReorderColumnAction>({
    type: 'REORDER_COLUMN',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {columns} = draft;
            const {columnId, newIndex} = payload;
            const columnToMove = find(columns, ({id}) => id === columnId);

            if (!columnToMove) return;

            const rowGroup = filter(columns, (column) => column.rowId === columnToMove.rowId);
            const oldIndex = findIndex(rowGroup, ({id}) => id === columnId);

            draft.columns = concat(
                filter(columns, (column) => column.rowId !== columnToMove.rowId),
                reorderItems(
                    rowGroup,
                    oldIndex,
                    newIndex
                )
            );
        });
    }
});
