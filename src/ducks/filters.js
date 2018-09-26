import update from 'immutability-helper';
import { CALL_API } from '../middlewares/api';

export const ON_FILTER_SELECT = "ON_FILTER_SELECT";
export const REMOVE_ACTIVATED_FILTER = "REMOVE_ACTIVATED_FILTER";
export const FILTERS_REQUEST = "FILTERS_REQUEST";
export const FILTERS_SUCCESS = "FILTERS_SUCCESS";
export const FILTERS_FAILURE = "FILTERS_FAILURE";
export const FILTERS_PAGE_CHANGE = "FILTER_PAGE_CHANGE";

const initialState = {
    main: {},
    search: {},
    order: {},
    results: {
        isFetching: false,
        isLoaded: false,
        page: 0,
        response: null,
        error: null,
        customHeaders: [0]
    }
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
                results: {
                    isFetching: { $set: true }
                }
            });
        }

        case FILTERS_SUCCESS:
        {
            let { response } = payload;
            return update(state, {
                results: {
                    isFetching: { $set: false },
                    isLoaded: { $set: true },
                    response: { $set: response },
                    error: { $set: null }
                }
            });
        }

        case FILTERS_FAILURE:
        {
            let { error } = payload;
            return update(state, {
                results: {
                    isFetching: { $set: false },
                    error: { $set: error }
                }
            });
        }

        case FILTERS_PAGE_CHANGE:
        {
            let { page } = payload;
            return update(state, {
                results: {
                    page: {
                        $set: page
                    }
                }
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

const onPageChange = (page) => ({
    type: FILTERS_PAGE_CHANGE,
    payload: {
        page
    }
});

export const actions = {
    onSelect,
    onRemove,
    onPageChange,
    applyFilters
};
