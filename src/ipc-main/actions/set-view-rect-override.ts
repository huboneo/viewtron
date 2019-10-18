import {Rectangle} from 'electron';
import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type SetViewRectOverridePayload = { id: string, rectOverride: Rectangle };

export type SetViewRectOverrideAction = AppActionMould<'SET_VIEW_RECT_OVERRIDE', SetViewRectOverridePayload>

export const [setViewRectOverride] = actionCreatorFactory<SetViewRectOverrideAction>({
    type: 'SET_VIEW_RECT_OVERRIDE',
    reducer(state, payload) {
        const {viewOptions} = state;
        const {id, rectOverride} = payload;

        if (!viewOptions[id]) return state;

        return {
            ...state,
            viewOptions: {
                ...viewOptions,
                [id]: {
                    ...viewOptions[id],
                    rectOverride
                }
            }
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
