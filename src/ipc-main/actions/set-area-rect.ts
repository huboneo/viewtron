import {actionCreatorFactory} from 'conduxion';
import {Rectangle} from 'electron';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type SetAreaRectPayload = Rectangle

export type SetAreaRectAction = AppActionMould<'SET_AREA_RECT', SetAreaRectPayload>

export const [setAreaRect] = actionCreatorFactory<SetAreaRectAction>({
    type: 'SET_AREA_RECT',
    reducer(state, payload) {
        return {
            ...state,
            currentAppAreaRect: payload
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews())
    }
});
