import {actionCreatorFactory} from 'conduxion';
import {forEach, includes, filter} from 'lodash';

import {AppActionMould} from '../state';

export type BroadcastToViewsPayload = { windowId: string, channel: string, args: any[], viewIds?: string[] };

export type BroadcastToViewsAction = AppActionMould<'BROADCAST_TO_VIEWS', BroadcastToViewsPayload>

export const [broadcastToViews] = actionCreatorFactory<BroadcastToViewsAction>({
    type: 'BROADCAST_TO_VIEWS',
    consequence({getState, action}) {
        const {channel, args, viewIds} = action.payload;
        const {views} = getState();
        const viewsToBroadcast = viewIds
            ? filter(views, ({id}) => includes(viewIds, id))
            : views;

        forEach(viewsToBroadcast, ({instance}) => {
            if (!instance) return;

            instance.webContents.send(channel, ...args);
        });
    }
});
