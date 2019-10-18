import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {getOverrideValue} from '../utils';

type SetViewHeightOverridePayload = { id: string, height: number };

export type SetViewHeightOverrideAction = AppActionMould<'SET_VIEW_HEIGHT_OVERRIDE', SetViewHeightOverridePayload>

export const [setViewHeightOverride] = actionCreatorFactory<SetViewHeightOverrideAction>({
    type: 'SET_VIEW_HEIGHT_OVERRIDE',
    reducer(state, payload) {
        const {config, currentAppAreaRect, viewOptions} = state;
        const {id, height} = payload;

        if (!currentAppAreaRect || !viewOptions[id]) return state;

        return {
            ...state,
            viewOptions: {
                ...viewOptions,
                [id]: {
                    ...viewOptions[id],
                    height: getOverrideValue(config, currentAppAreaRect.height, height)
                }
            }
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
