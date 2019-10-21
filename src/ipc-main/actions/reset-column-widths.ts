import {actionCreatorFactory} from 'conduxion';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetColumnWidthsPayload = { columnIds?: string[] };

export type ResetColumnWidthsAction = AppActionMould<'RESET_COLUMN_WIDTHS', ResetColumnWidthsPayload>

export const [resetColumnWidths] = actionCreatorFactory<ResetColumnWidthsAction>({
    type: 'RESET_COLUMN_WIDTHS',
    reducer(state, payload) {
        const {columns} = state;
        const {columnIds = []} = payload;

        if (payload.columnIds) {
            return {
                ...state,
                columns: map(
                    columns,
                    (column) => includes(columnIds, column.id)
                        ? omit(column, 'width')
                        : column
                )
            }
        }

        return {
            ...state,
            columns: map(
                columns,
                (column) => omit(column, 'width')
            )
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
