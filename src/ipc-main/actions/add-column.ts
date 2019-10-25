import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {some} from 'lodash';

import {AppActionMould} from '../state';
import {Column} from '../../types';

import {getOverrideValue} from '../utils';

type AddColumnPayload = Column;

export type AddColumnAction = AppActionMould<'ADD_COLUMN', AddColumnPayload>

export const [addColumn] = actionCreatorFactory<AddColumnAction>({
    type: 'ADD_COLUMN',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {rowId, width, windowId} = payload;
            const {rows, activeWindows} = draft;
            const {config, rect} = activeWindows[windowId] || {};
            const rowExists = some(rows, ({id}) => id === rowId);

            if (!rect || !rowExists) return;

            draft.columns.push({
                ...payload,
                width: width
                    ? getOverrideValue(config, rect.width, width)
                    : undefined
            });
        });
    }
});
