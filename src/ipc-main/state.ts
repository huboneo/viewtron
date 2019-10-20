import {BrowserWindow, BrowserView, Rectangle} from 'electron';
import {ConduxionAction, ConduxionActionMould, makeStore, RootReducer} from 'conduxion';

import {ViewtronView, ViewtronConfig} from '../types';

import {DEFAULT_CONFIG} from '../constants';

export type ActiveViews = { [key: string]: BrowserView };
export type Column = { id: string, rowId: string, name?: string, width?: number };
export type Row = { id: string, name?: string, height?: number };
export type AppDependencies = {};
export type AppState = {
    config: ViewtronConfig
    mainWindow: BrowserWindow | null
    currentAppAreaRect: Rectangle | null
    views: ViewtronView[]
    rows: Row[]
    columns: Column[]
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
    columns: [],
    views: [],
    activeViews: {}
};

const rootReducer: RootReducer<AppState, AppAction, AppDependencies> = (state = INITIAL_APP_STATE, action) => action.reducer
    ? action.reducer(state, action.payload)
    : state;

export default makeStore<AppState, AppAction, AppDependencies>(rootReducer, INITIAL_APP_STATE);
