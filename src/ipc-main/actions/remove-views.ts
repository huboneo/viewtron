import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, forEach} from 'lodash';

import {AppActionMould} from '../state';

type RemoveViewsPayload = { windowId: string, viewIds: string[] }

export type RemoveViewsAction = AppActionMould<'REMOVE_VIEWS', RemoveViewsPayload>

export const [removeViews] = actionCreatorFactory<RemoveViewsAction>({
    type: 'REMOVE_VIEWS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, views} = draft;
            const {windowId, viewIds} = payload;
            const viewsToRemove = filter(views, ({id}) => includes(viewIds, id));

            forEach(viewsToRemove, (view) => {
                if (activeWindows[windowId] && view.instance) {
                    activeWindows[windowId].instance.removeBrowserView(view.instance);
                }
                view.instance.destroy();
            });

            draft.views = filter(views, ({id}) => !includes(viewIds, id));
        });
    }
});
