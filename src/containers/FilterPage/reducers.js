import update from 'immutability-helper';

import {
    ON_FILTER_SELECT,
    REMOVE_ACTIVATED_FILTER,
    FILTERS_REQUEST,
    FILTERS_SUCCESS,
    FILTERS_FAILURE,
    FILTERS_CHANGE_SIGNAL,
    FILTERS_CHANGE_SORT,
    FILTERS_CUSTOM_HEADERS,
    FILTERS_PAGE_CHANGE,
    FILTERS_SEARCH,
} from './constants';

const initialState = {
    selectedFilters: [],
    search: "",
    sort: [],
    signal: "",
    page: 0,
    results: {
        summaryHeaderIds: "all",
        customHeaderIds: "all",
        isLoading: false,
        isLoaded: false,
        response: null,
        error: null,
    }
};

export default (state = initialState, action) => {
    let {
        type,
        payload,
        meta = {}
    } = action;

    switch (type) {
        case ON_FILTER_SELECT:
        {
            let value = payload;
            return update(state, {
                selectedFilters: (arr) => {
                    let [selectName,_] = value.split('__');
                    let filteredArr = arr.filter(item => item.indexOf(selectName) == -1);
                    return [value, ...filteredArr];
                }
            });
        }

        case REMOVE_ACTIVATED_FILTER:
        {
            let value = payload;
            return update(state, {
                selectedFilters: (arr) => {
                    return arr.filter(item => item !== value);
                }
            })
        }

        case FILTERS_REQUEST:
        {
            return update(state, {
                results: {
                    isLoading: { $set: true },
                    loadingType: { $set: meta.loadingType }
                }
            });
        }

        case FILTERS_SUCCESS:
        {
            let { response } = payload;
            return update(state, {
                results: {
                    isLoading: { $set: false },
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
                    isLoading: { $set: false },
                    error: { $set: error }
                }
            });
        }

        case FILTERS_PAGE_CHANGE:
        {
            let { page } = payload;
            return update(state, {
                page: {
                    $set: page
                }
            });
        }

        case FILTERS_CUSTOM_HEADERS:
        {
            let { value } = payload;
            return update(state, {
                results: {
                    customHeaderIds: {
                        $set: value
                    }
                }
            });
        }

        case FILTERS_SEARCH:
        {
            let { value } = payload;
            return update(state, {
                search: { $set: value }
            });
        }
        
        case FILTERS_CHANGE_SIGNAL:
        {
            let { value } = payload;
            return update(state, {
                signal: { $set: value }
            });
        }

        case FILTERS_CHANGE_SORT:
        {
            let { value } = payload;
            return update(state, {
                sort: { $set: value }
            });
        }

        default:
            return state;
    }
}