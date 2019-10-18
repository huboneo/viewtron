import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetRowHeightOverridePayload = { rowIndex: number, height: number };

export type SetRowHeightOverrideAction = AppActionMould<'SET_ROW_HEIGHT_OVERRIDE', SetRowHeightOverridePayload>

export const [setRowHeightOverride] = actionCreatorFactory<SetRowHeightOverrideAction>({
    type: 'SET_ROW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, rows} = state;
        const {rowIndex, height} = payload;

        if (!currentAppAreaRect || !rows[rowIndex]) return state;

        // @todo: immer
        rows[rowIndex] = {
            ...rows[rowIndex],
            height: getOverrideValue(config, currentAppAreaRect.height, height)
        };

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
