import { get, merge } from 'lodash-es';
import update from 'immutability-helper';
import { REQUEST, SUCCESS, FAILURE} from './actions';

export const UQ_KEY = '@COMMON/REQUEST';

export function uqSelector(where, state) {
    return get(state, `${UQ_KEY}.${where}`);
}

export default function uqReducer(state = {}, action) {
    const {
        type,
        meta,
        payload
    } = action;

    switch (type) {
        case REQUEST: {
            const { where } = meta;
            const st = update(state, {
                $apply: (s) => merge(s, {
                    [where]: {
                        loading: true
                    }
                })
            });
            return st;
        }

        case SUCCESS: {
            const { where } = meta;
            return update(state, {
                $merge: {
                    [where]: {
                        loading: false,
                        data: payload.data,
                        error: null
                    }
                }
            })
        }

        case FAILURE: {
            const { where } = meta;
            return update(state, {
                $merge: {
                    [where]: {
                        loading: false,
                        data: null,
                        error: payload.error
                    }
                }
            })
        }

        default:
            return state;
    }
}