import {actionCreatorFactory} from 'conduxion';
import { find } from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetColumnWidthOverridePayload = { columnId: string, width: number };

export type SetColumnWidthOverrideAction = AppActionMould<'SET_COLUMN_WIDTH_OVERRIDE', SetColumnWidthOverridePayload>

export const [setColumnWidthOverride] = actionCreatorFactory<SetColumnWidthOverrideAction>({
    type: 'SET_COLUMN_WIDTH_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, columns} = state;
        const {columnId, width} = payload;
        const column = find(columns, ({id}) => id === columnId);

        if (!currentAppAreaRect || !column) return state;

        // @todo: immer
        column.width = getOverrideValue(config, currentAppAreaRect.width, width);

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
