import {actionCreatorFactory} from 'conduxion';
import {filter, forEach} from 'lodash';

import {AppActionMould} from '../state';

import {updateViews} from './update-views';
import {removeView} from './remove-view';

type RemoveColumnPayload = { columnId: string };

export type RemoveColumnAction = AppActionMould<'REMOVE_COLUMN', RemoveColumnPayload>

export const [removeColumn] = actionCreatorFactory<RemoveColumnAction>({
    type: 'REMOVE_COLUMN',
    reducer(state, payload) {
        const {columns} = state;
        const {columnId} = payload;

        return {
            ...state,
            columns: filter(columns, ({id}) => id !== columnId)
        };
    },
    consequence({dispatch, getState, action}) {
        const {payload} = action;
        const {views} = getState();
        const columnViews = filter(
            views,
            ({columnId}) => columnId === payload.columnId
        );

        // @todo: cleanup
        forEach(columnViews, ({id}) => dispatch(removeView({viewId: id})));

        dispatch(updateViews());
    }
});
