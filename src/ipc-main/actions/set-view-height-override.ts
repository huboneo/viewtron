import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {findIndex} from 'lodash';

import {AppActionMould} from '../state';

import {getOverrideValue} from '../utils';

type SetViewHeightOverridePayload = { windowId: string, viewId: string, height: number };

export type SetViewHeightOverrideAction = AppActionMould<'SET_VIEW_HEIGHT_OVERRIDE', SetViewHeightOverridePayload>

export const [setViewHeightOverride] = actionCreatorFactory<SetViewHeightOverrideAction>({
    type: 'SET_VIEW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, views} = draft;
            const {windowId, viewId, height} = payload;
            const viewIndex = findIndex(views, ({id}) => id === viewId);
            const {config, rect} = activeWindows[windowId] || {};

            if (!rect || viewIndex < 0) return;

            draft.views[viewIndex].height = getOverrideValue(config, rect.height, height);
        });
    }
});
