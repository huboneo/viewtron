import {actionCreatorFactory} from 'conduxion';
import {omit, filter} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type RemoveViewPayload = {viewId: string}

export type RemoveViewAction = AppActionMould<'REMOVE_VIEW', RemoveViewPayload>

export const [removeView] = actionCreatorFactory<RemoveViewAction>({
    type: 'REMOVE_VIEW',
    reducer(state, payload) {
        const {viewId} = payload;
        const {mainWindow, activeViews} = state;
        const view = activeViews[viewId];

        if (mainWindow && view) {
            mainWindow.removeBrowserView(view);
            view.destroy();
        }

        return {
            ...state,
            views: filter(state.views, ({id}) => id !== viewId),
            activeViews: omit(state.activeViews, viewId)
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews())
    }
});
