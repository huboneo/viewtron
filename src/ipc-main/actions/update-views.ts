import {actionCreatorFactory} from 'conduxion';
import {forEach, debounce, assign, reduce, values} from 'lodash';

import {AppActionMould, ViewOption} from '../state';

import {VIEWS_UPDATED_MESSAGE} from '../../constants';
import calculateNewViewRects from '../utils';

const debouncedEmitter = debounce((mainWindow, viewOptions: ViewOption[]) => {
    mainWindow.webContents.send(VIEWS_UPDATED_MESSAGE, Object.values(viewOptions));
}, 300);

export type UpdateViewsAction = AppActionMould<'UPDATE_VIEWS', undefined>

export const [updateViews] = actionCreatorFactory<UpdateViewsAction>({
    type: 'UPDATE_VIEWS',
    reducer(state) {
        const {currentAppAreaRect, viewOptions} = state;
        const views = values(viewOptions);

        if (!currentAppAreaRect) return state;

        const updatedViews = calculateNewViewRects(currentAppAreaRect, views);

        return {
            ...state,
            viewOptions: reduce(updatedViews, (agg, view) => assign(agg, {[view.id]: view}), {})
        }
    },
    consequence({getState}) {
        const {activeViews, mainWindow, viewOptions} = getState();
        const views = values(viewOptions);

        forEach(views, ({id, rect, rectOverride}) => {
            const view = activeViews[id];

            if (!view || (!rect && !rectOverride)) return;

            // @ts-ignore
            view.setBounds(rectOverride || rect);
        });

        debouncedEmitter(mainWindow, Object.values(viewOptions));
    }
});
