import {actionCreatorFactory} from 'conduxion';
import {omit} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type RemoveViewPayload = string

export type RemoveViewAction = AppActionMould<'REMOVE_VIEW', RemoveViewPayload>

export const [removeView] = actionCreatorFactory<RemoveViewAction>({
    type: 'REMOVE_VIEW',
    reducer(state, payload) {
        const {mainWindow, activeViews} = state;
        const view = activeViews[payload];

        if (mainWindow && view) {
            mainWindow.removeBrowserView(view);
            view.destroy();
        }

        return {
            ...state,
            viewOptions: omit(state.viewOptions, payload),
            activeViews: omit(state.activeViews, payload)
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews())
    }
});
