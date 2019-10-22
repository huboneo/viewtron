import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import { findIndex } from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetColumnWidthOverridePayload = { windowId: string, columnId: string, width: number };

export type SetColumnWidthOverrideAction = AppActionMould<'SET_COLUMN_WIDTH_OVERRIDE', SetColumnWidthOverridePayload>

export const [setColumnWidthOverride] = actionCreatorFactory<SetColumnWidthOverrideAction>({
    type: 'SET_COLUMN_WIDTH_OVERRIDE',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, columns} = draft;
            const {windowId, columnId, width} = payload;
            const columnIndex = findIndex(columns, ({id}) => id === columnId);
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect || columnIndex < 0) return;

            draft.columns[columnIndex].width = getOverrideValue(config, rect.width, width);
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
