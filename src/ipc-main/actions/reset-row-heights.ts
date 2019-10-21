import {actionCreatorFactory} from 'conduxion';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetRowHeightsPayload = { rowIds?: string[] };

export type ResetRowHeightsAction = AppActionMould<'RESET_ROW_HEIGHTS', ResetRowHeightsPayload>

export const [resetRowHeights] = actionCreatorFactory<ResetRowHeightsAction>({
    type: 'RESET_ROW_HEIGHTS',
    reducer(state, payload) {
        const {rows} = state;
        const {rowIds = []} = payload;

        if (payload.rowIds) {
            return {
                ...state,
                rows: map(
                    rows,
                    (row) => includes(rowIds, row.id)
                        ? omit(row, 'height')
                        : row
                )
            }
        }

        return {
            ...state,
            rows: map(
                rows,
                (row) => omit(row, 'height')
            )
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
