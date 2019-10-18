import {BrowserWindow, BrowserView, Rectangle} from 'electron';
import {ConduxionAction, ConduxionActionMould, makeStore, RootReducer} from 'conduxion';

import {ViewtronViews, ViewtronConfig} from '../types';

import {DEFAULT_CONFIG} from '../constants';

export type ViewOptions = { [key: string]: ViewtronViews };
export type ActiveViews = { [key: string]: BrowserView };
export type Column = { name?: string, width?: number };
export type Row = { name?: string, height?: number , columns: Column[]};
export type AppDependencies = {};
export type AppState = {
    config: ViewtronConfig
    mainWindow: BrowserWindow | null
    currentAppAreaRect: Rectangle | null
    viewOptions: ViewOptions
    rows: Row[]
    activeViews: ActiveViews
}
export type AppActionMould<T extends string, P> = ConduxionActionMould<T,
    P,
    AppState,
    AppDependencies>

type AppAction = ConduxionAction<AppState, AppDependencies>
const INITIAL_APP_STATE: AppState = {
    config: DEFAULT_CONFIG,
    mainWindow: null,
    currentAppAreaRect: null,
    rows: [],
    viewOptions: {},
    activeViews: {}
};

const rootReducer: RootReducer<AppState, AppAction, AppDependencies> = (state = INITIAL_APP_STATE, action) => action.reducer
    ? action.reducer(state, action.payload)
    : state;

export default makeStore<AppState, AppAction, AppDependencies>(rootReducer, INITIAL_APP_STATE);
