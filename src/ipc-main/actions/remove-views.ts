import {actionCreatorFactory} from 'conduxion';
import {omit, filter, includes, values, pick, forEach} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type RemoveViewPayload = {viewIds: string[]}

export type RemoveViewAction = AppActionMould<'REMOVE_VIEW', RemoveViewPayload>

export const [removeViews] = actionCreatorFactory<RemoveViewAction>({
    type: 'REMOVE_VIEW',
    reducer(state, payload) {
        const {viewIds} = payload;
        const {mainWindow, activeViews, views} = state;
        const viewToRemove = values(pick(activeViews, viewIds));

        forEach(viewToRemove, (view) => {
            if (mainWindow && view) {
                mainWindow.removeBrowserView(view);
                view.destroy();
            }
        });

        return {
            ...state,
            views: filter(views, ({id}) => !includes(viewIds, id)),
            activeViews: omit(activeViews, viewIds)
        }
    },
    consequence({dispatch}) {
        dispatch(updateViews())
    }
});
