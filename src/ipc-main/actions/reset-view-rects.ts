import {actionCreatorFactory} from 'conduxion';
import {assign, entries, reduce, omit} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';

type ResetViewRectsPayload = { id?: string };

export type ResetViewRectsAction = AppActionMould<'RESET_VIEW_RECTS', ResetViewRectsPayload>

export const [resetViewRects] = actionCreatorFactory<ResetViewRectsAction>({
    type: 'RESET_VIEW_RECTS',
    reducer(state, payload) {
        const {viewOptions} = state;
        const {id} = payload;

        if (id && !viewOptions[id]) return state;

        if (id) {
            return {
                ...state,
                viewOptions: {
                    ...viewOptions,
                    [id]: omit(viewOptions[id], 'rectOverride')
                }
            }
        }

        return {
            ...state,
            viewOptions: reduce(
                entries(viewOptions),
                (agg, [key, val]) => assign(agg, {[key]: omit(val, 'rectOverride')}),
                {}
            )
        };
    },
    consequence({dispatch}) {
        dispatch(updateViews());
    }
});
