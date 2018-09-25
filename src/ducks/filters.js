import update from 'immutability-helper';
import { CALL_API } from '../middlewares/api';

export const ON_FILTER_SELECT = "ON_FILTER_SELECT";
export const REMOVE_ACTIVATED_FILTER = "REMOVE_ACTIVATED_FILTER";
export const FILTERS_REQUEST = "FILTERS_REQUEST";
export const FILTERS_SUCCESS = "FILTERS_SUCCESS";
export const FILTERS_FAILURE = "FILTERS_FAILURE";

const initialState = {
    isFetching: false,
    main: {},
    search: {},
    order: {},
    results: {}
};

export default (state = initialState, action) => {
    let {
        type,
        payload
    } = action;

    switch (type) {
        case ON_FILTER_SELECT:
        case REMOVE_ACTIVATED_FILTER:
        {
            let {
                filterType,
                filterId,
                optionId = null
            } = payload;

            return update(state, {
                main: {
                    $auto: {
                        [filterType]: {
                            $auto: {
                                [filterId]: { $set: optionId }
                            }
                        }
                    }
                }
            });
        }

        case FILTERS_REQUEST:
        {
            return update(state, {
                isFetching: { $set: true }
            });
        }

        case FILTERS_SUCCESS:
        {
            let { response } = payload;
            return update(state, {
                isFetching: { $set: false },
                results: { $set: response }
            });
        }

        case FILTERS_FAILURE:
        {
            let { error } = payload;
            return update(state, {
                isFetching: { $set: false }
            });
        }
        
        default:
            return state;
    }
}

const onSelect = (filterType, filterId, optionId) => ({
    type: ON_FILTER_SELECT,
    payload: {
        filterType,
        filterId,
        optionId
    }
});

const onRemove = (filterType, filterId) => () => ({
    type: REMOVE_ACTIVATED_FILTER,
    payload: {
        filterType,
        filterId
    }
});

const applyFilters = (url) => ({
    [CALL_API]: {
        types: [FILTERS_REQUEST, FILTERS_SUCCESS, FILTERS_FAILURE],
        endpoint: url
    }
});

export const actions = {
    onSelect,
    onRemove,
    applyFilters
};
