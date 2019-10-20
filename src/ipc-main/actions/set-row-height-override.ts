import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';
import { find } from 'lodash';

type SetRowHeightOverridePayload = { rowId: string, height: number };

export type SetRowHeightOverrideAction = AppActionMould<'SET_ROW_HEIGHT_OVERRIDE', SetRowHeightOverridePayload>

export const [setRowHeightOverride] = actionCreatorFactory<SetRowHeightOverrideAction>({
    type: 'SET_ROW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, rows} = state;
        const {rowId, height} = payload;
        const row = find(rows, ({id}) => id === rowId);

        if (!currentAppAreaRect || !row) return state;

        // @todo: immer
        row.height = getOverrideValue(config, currentAppAreaRect.height, height);

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
