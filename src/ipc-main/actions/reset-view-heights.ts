import {actionCreatorFactory} from 'conduxion';
import produce from 'immer';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

type ResetViewHeightsPayload = { windowId: string, viewIds?: string[] };

export type ResetViewHeightsAction = AppActionMould<'RESET_VIEW_HEIGHTS', ResetViewHeightsPayload>

export const [resetViewHeights] = actionCreatorFactory<ResetViewHeightsAction>({
    type: 'RESET_VIEW_HEIGHTS',
    reducer(state, payload) {
        return produce(state, (draft) => {
            const {views} = draft;
            const {viewIds = []} = payload;

            if (payload.viewIds) {
                draft.views = map(
                    views,
                    (view) => includes(viewIds, view.id)
                        ? omit(view, 'height')
                        : view
                );
                return;
            }

            draft.views = map(
                views,
                (view) => omit(view, 'height')
            );
        });
    }
});
