import {actionCreatorFactory} from 'conduxion';

import {AppActionMould} from '../state';
import {ViewtronConfig} from '../../types';

type SetConfigPayload = ViewtronConfig

export type SetConfigAction = AppActionMould<'SET_CONFIG', SetConfigPayload>

export const [setConfig] = actionCreatorFactory<SetConfigAction>({
    type: 'SET_CONFIG',
    reducer(state, payload) {
        return {
            ...state,
            config: payload
        }
    }
});
