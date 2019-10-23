import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {findIndex} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetRowHeightOverridePayload = { windowId: string, rowId: string, height: number };

export type SetRowHeightOverrideAction = AppActionMould<'SET_ROW_HEIGHT_OVERRIDE', SetRowHeightOverridePayload>

export const [setRowHeightOverride] = actionCreatorFactory<SetRowHeightOverrideAction>({
    type: 'SET_ROW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, rows} = draft;
            const {windowId, rowId, height} = payload;
            const rowIndex = findIndex(rows, ({id}) => id === rowId);
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect || rowIndex < 0) return;

            draft.rows[rowIndex].height = getOverrideValue(config, rect.height, height);
        });
    },
    consequence({dispatch, action}) {
        const {windowId} = action.payload;

        dispatch(updateViews({windowId}));
    }
});
