import {ConduxionAction, ConduxionActionMould, makeStore, RootReducer} from 'conduxion';

import {Column, Row, ViewtronView, ViewtronWindow} from '../types';

export type ActiveWindows = { [key: string]: ViewtronWindow };
export type AppDependencies = {};
export type AppState = {
    activeWindows: ActiveWindows,
    rows: Row[],
    columns: Column[],
    views: ViewtronView[]
}
export type AppActionMould<T extends string, P> = ConduxionActionMould<T,
    P,
    AppState,
    AppDependencies>

export type AppAction = ConduxionAction<AppState, AppDependencies>
const INITIAL_APP_STATE: AppState = {
    activeWindows: {},
    rows: [],
    columns: [],
    views: []
};

const rootReducer: RootReducer<AppState, AppAction, AppDependencies> = (state = INITIAL_APP_STATE, action) => action.reducer
    ? action.reducer(state, action.payload)
    : state;

export default makeStore<AppState, AppAction, AppDependencies>(rootReducer, INITIAL_APP_STATE);
