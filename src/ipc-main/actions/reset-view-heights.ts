import {actionCreatorFactory} from 'conduxion';
import {assign, entries, reduce, omit} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetViewHeightsPayload = { id?: string };

export type ResetViewHeightsAction = AppActionMould<'RESET_VIEW_HEIGHTS', ResetViewHeightsPayload>

export const [resetViewHeights] = actionCreatorFactory<ResetViewHeightsAction>({
    type: 'RESET_VIEW_HEIGHTS',
    reducer(state, payload) {
        const {viewOptions} = state;
        const {id} = payload;

        // @todo: rows/columns
        if (id && !viewOptions[id]) return state;

        if (id) {
            return {
                ...state,
                viewOptions: {
                    ...viewOptions,
                    [id]: omit(viewOptions[id], 'height')
                }
            }
        }

        return {
            ...state,
            viewOptions: reduce(
                entries(viewOptions),
                (agg, [key, val]) => assign(agg, {[key]: omit(val, 'height')}),
                {}
            )
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
