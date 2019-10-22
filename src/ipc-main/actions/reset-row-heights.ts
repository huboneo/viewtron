import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetRowHeightsPayload = { windowId: string, rowIds?: string[] };

export type ResetRowHeightsAction = AppActionMould<'RESET_ROW_HEIGHTS', ResetRowHeightsPayload>

export const [resetRowHeights] = actionCreatorFactory<ResetRowHeightsAction>({
    type: 'RESET_ROW_HEIGHTS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rows} = draft;
            const {rowIds = []} = payload;

            if (payload.rowIds) {
                draft.rows = map(
                    rows,
                    (row) => includes(rowIds, row.id)
                        ? omit(row, 'height')
                        : row
                );
                return;
            }

            draft.rows = map(
                rows,
                (row) => omit(row, 'height')
            );
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
