import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {filter, includes, forEach, map} from 'lodash';

import {AppActionMould} from '../state';

type SetViewVisibilityPayload = { windowId: string, viewIds: string[], visible: boolean }

export type SetViewVisibilityAction = AppActionMould<'SET_VIEW_VISIBILITY', SetViewVisibilityPayload>

export const [setViewVisibility] = actionCreatorFactory<SetViewVisibilityAction>({
    type: 'SET_VIEW_VISIBILITY',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {activeWindows, views} = draft;
            const {windowId, viewIds, visible} = payload;
            const viewsToSet = filter(views, ({id}) => includes(viewIds, id));

            forEach(viewsToSet, (view) => {
                if (!visible && !view.hidden && activeWindows[windowId] && view.instance) {
                    activeWindows[windowId].instance.removeBrowserView(view.instance);
                }

                if (visible && view.hidden && activeWindows[windowId] && view.instance) {
                    activeWindows[windowId].instance.addBrowserView(view.instance);
                }
            });

            draft.views = map(views, (view) => includes(viewIds, view.id)
                ? {...view, hidden: !visible}
                : view
            );
        });
    }
});
