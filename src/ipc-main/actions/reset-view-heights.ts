import {actionCreatorFactory} from 'conduxion';
import {omit, includes, map} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetViewHeightsPayload = { viewIds?: string[] };

export type ResetViewHeightsAction = AppActionMould<'RESET_VIEW_HEIGHTS', ResetViewHeightsPayload>

export const [resetViewHeights] = actionCreatorFactory<ResetViewHeightsAction>({
    type: 'RESET_VIEW_HEIGHTS',
    reducer(state, payload) {
        const {views} = state;
        const {viewIds = []} = payload;

        if (payload.viewIds) {
            return {
                ...state,
                views: map(
                    views,
                    (view) => includes(viewIds, view.id)
                        ? omit(view, 'height')
                        : view
                )
            }
        }

        return {
            ...state,
            views: map(
                views,
                (view) => omit(view, 'height')
            )
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
