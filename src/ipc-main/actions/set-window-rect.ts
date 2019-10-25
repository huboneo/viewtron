import {Rectangle} from 'electron';
import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';

import {AppActionMould} from '../state';

type SetAreaRectPayload = { windowId: string, rect: Rectangle }

export type SetAreaRectAction = AppActionMould<'SET_AREA_RECT', SetAreaRectPayload>

export const [setWindowRect] = actionCreatorFactory<SetAreaRectAction>({
    type: 'SET_AREA_RECT',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {windowId, rect} = payload;
            const {activeWindows} = draft;

            if (!activeWindows[windowId]) return;

            draft.activeWindows[windowId].rect = rect;
        });
    }
});
