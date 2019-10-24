import {actionCreatorFactory} from 'conduxion';
import uuid from 'uuid/v4';
import {filter, map, forEach} from 'lodash';

import {AppActionMould} from '../state';
import {LayoutRow} from '../../types';

import {addRow} from './add-row';
import {addColumn} from './add-column';
import {addView} from './add-view';
import {removeRows} from './remove-rows';

type SetLayoutPayload = {
    windowId: string;
    layout: LayoutRow[];
};

export type SetLayoutAction = AppActionMould<'SET_LAYOUT', SetLayoutPayload>

export const [setLayout] = actionCreatorFactory<SetLayoutAction>({
    type: 'SET_LAYOUT',
    consequence({dispatch, getState, action}) {
        const {rows} = getState();
        const {windowId, layout} = action.payload;

        // out with the old
        dispatch(removeRows({
            windowId,
            rowIds: map(filter(rows, (row) => row.windowId === windowId), 'id')})
        );

        // and in with the new
        forEach(layout, (row) => {
            const rowId = uuid();

            dispatch(addRow({
                ...row,
                id: rowId,
                windowId
            }));

            forEach(row.columns, (column) => {
                const columnId = uuid();

                dispatch(addColumn({
                    ...column,
                    id: columnId,
                    rowId,
                    windowId
                }));

                forEach(column.views, (view) =>{
                    const id = uuid();

                    dispatch(addView({
                        ...view,
                        id,
                        windowId,
                        columnId
                    }));
                });
            });
        });
    }
});
