import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, findIndex, concat} from 'lodash';

import {AppActionMould} from '../state';

import {reorderItems} from '../utils';

type ReorderRowPayload = { windowId: string, rowId: string, newIndex: number };

export type ReorderRowAction = AppActionMould<'REORDER_ROW', ReorderRowPayload>

export const [reorderRow] = actionCreatorFactory<ReorderRowAction>({
    type: 'REORDER_ROW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rows} = draft;
            const {windowId, rowId, newIndex} = payload;
            const windowRows = filter(rows, (row) => row.windowId === windowId);
            const oldIndex = findIndex(windowRows, ({id}) => id === rowId);

            draft.rows = concat(
                filter(rows, (row) => row.windowId !== windowId),
                reorderItems(
                    windowRows,
                    oldIndex,
                    newIndex
                )
            );
        });
    }
});
