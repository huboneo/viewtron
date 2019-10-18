import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetColumnWidthOverridePayload = { rowIndex: number, columnIndex: number, width: number };

export type SetColumnWidthOverrideAction = AppActionMould<'SET_COLUMN_WIDTH_OVERRIDE', SetColumnWidthOverridePayload>

export const [setColumnWidthOverride] = actionCreatorFactory<SetColumnWidthOverrideAction>({
    type: 'SET_COLUMN_WIDTH_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, rows} = state;
        const {rowIndex, columnIndex, width} = payload;

        if (!currentAppAreaRect || !rows[rowIndex] || !rows[rowIndex].columns[columnIndex]) return state;

        // @todo: immer
        rows[rowIndex].columns[columnIndex] = {
            ...rows[rowIndex].columns[columnIndex],
            width: getOverrideValue(config, currentAppAreaRect.width, width)
        };

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
