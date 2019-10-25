import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

type ResetColumnWidthsPayload = { windowId: string, columnIds?: string[] };

export type ResetColumnWidthsAction = AppActionMould<'RESET_COLUMN_WIDTHS', ResetColumnWidthsPayload>

export const [resetColumnWidths] = actionCreatorFactory<ResetColumnWidthsAction>({
    type: 'RESET_COLUMN_WIDTHS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {columns} = draft;
            const {columnIds = []} = payload;

            if (payload.columnIds) {
                draft.columns = map(
                    columns,
                    (column) => includes(columnIds, column.id)
                        ? omit(column, 'width')
                        : column
                );
                return;
            }

            draft.columns = map(
                columns,
                (column) => omit(column, 'width')
            );
        });
    }
});
