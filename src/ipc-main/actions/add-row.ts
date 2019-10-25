import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';

import {Row} from '../../types';
import {AppActionMould} from '../state';

import {getOverrideValue} from '../utils';

type AddRowPayload = Row;

export type AddRowAction = AppActionMould<'ADD_ROW', AddRowPayload>

export const [addRow] = actionCreatorFactory<AddRowAction>({
    type: 'ADD_ROW',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {windowId, height} = payload;
            const {activeWindows} = draft;
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect) return;

            draft.rows.push({
                ...payload,
                height: height
                    ? getOverrideValue(config, rect.height, height)
                    : undefined
            });
        });
    }
});
