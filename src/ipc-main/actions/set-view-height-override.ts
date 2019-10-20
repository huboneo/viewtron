import {actionCreatorFactory} from 'conduxion';
import { find } from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetViewHeightOverridePayload = { viewId: string, height: number };

export type SetViewHeightOverrideAction = AppActionMould<'SET_VIEW_HEIGHT_OVERRIDE', SetViewHeightOverridePayload>

export const [setViewHeightOverride] = actionCreatorFactory<SetViewHeightOverrideAction>({
    type: 'SET_VIEW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, views} = state;
        const {viewId, height} = payload;
        const toSet = find(views, ({id}) => id === viewId);

        if (!currentAppAreaRect || !toSet) return state;

        // @todo: immer
        toSet.height = getOverrideValue(config, currentAppAreaRect.height, height);

        return state;
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
