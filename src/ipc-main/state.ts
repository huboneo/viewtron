import {BrowserWindow, BrowserView, Rectangle} from 'electron'
import {ConduxionAction, ConduxionActionMould, makeStore, RootReducer} from 'conduxion';

export type ViewOption = {
    id: string;
    path: string;
    name: string;
    rect?: Rectangle;
    rectOverride?: Rectangle;
    options?: any
}
export type ViewOptions = { [key: string]: ViewOption };
export type ActiveViews = { [key: string]: BrowserView };
export type AppDependencies = {};
export type AppState = {
    mainWindow: BrowserWindow | null
    currentAppAreaRect: Rectangle | null
    viewOptions: ViewOptions
    activeViews: ActiveViews
}
export type AppActionMould<T extends string, P> = ConduxionActionMould<T,
    P,
    AppState,
    AppDependencies>

type AppAction = ConduxionAction<AppState, AppDependencies>
const INITIAL_APP_STATE: AppState = {mainWindow: null, currentAppAreaRect: null, viewOptions: {}, activeViews: {}};

const rootReducer: RootReducer<AppState, AppAction, AppDependencies> = (state = INITIAL_APP_STATE, action) => action.reducer
    ? action.reducer(state, action.payload)
    : state;

export default makeStore<AppState, AppAction, AppDependencies>(rootReducer, INITIAL_APP_STATE);
