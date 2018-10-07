import update from 'immutability-helper';
import { flow, get, join, pickBy, isString, reduce, mapKeys, mapValues } from 'lodash/fp';
import queryString from 'query-string';

import { CALL_API } from '../middlewares/api';
import { filterApi } from '../apiConfig';
import { filter_list as filterList , filter_options as filterOptions } from '../data/filter.json';

export const ON_FILTER_SELECT = "ON_FILTER_SELECT";
export const REMOVE_ACTIVATED_FILTER = "REMOVE_ACTIVATED_FILTER";
export const FILTERS_REQUEST = "FILTERS_REQUEST";
export const FILTERS_SUCCESS = "FILTERS_SUCCESS";
export const FILTERS_FAILURE = "FILTERS_FAILURE";
export const FILTERS_PAGE_CHANGE = "FILTER_PAGE_CHANGE";
export const FILTERS_CUSTOM_HEADERS = "FILTERS_CUSTOM_HEADERS";
export const FILTERS_SEARCH = "FILTERS_SEARCH";
export const FILTERS_CHANGE_SIGNAL = "FILTERS_CHANGE_SIGNAL";
export const FILTERS_CHANGE_SORT = "FILTERS_CHANGE_SORT";

// TODO: need smart structure.
export const ALL = 'All_Loading';
export const PAGE = 'Page_Loading';

const initialState = {
    main: {},
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


const doFilter = (loadingType = ALL) => ({
    meta: { loadingType },
    [CALL_API]: {
        types: [FILTERS_REQUEST, FILTERS_SUCCESS, FILTERS_FAILURE],
        endpoint: (state) => {
            //TODO: find somewhere to place this code
            let url = filterApi;
            let page = { page: get('filters.page', state) };
            let search = { search: get('filters.search', state) };
            let signal = { signal: get('filters.signal', state) };
            let sort = { sort: join('_', get('filters.sort', state)) };
            let filters = reduce(
                (accum, value) => {
                    let newValue = flow(
                        pickBy(isString),
                        mapKeys(key => filterList[key].name),
                        mapValues(v => filterOptions[v].value)
                    )(value);
                    return ({
                        ...accum,
                        ...newValue
                    });
                },
                {},
                get('filters.main', state)
            );

            let all = pickBy(value => value !== "", Object.assign(
                {},
                page,
                search,
                signal,
                //sort,
                filters
            ));

            let query = queryString.stringify(all);
            
            let u = query ? url + "?" + query : url;

            return u;
        }
    }
});

const pageChange = (page) => ({
    type: FILTERS_PAGE_CHANGE,
    payload: {
        page
    }
});

const applyFilters = () => (dispatch) => {
    dispatch(pageChange(0));
    return dispatch(doFilter(ALL));
}

const onPageChange = (page) => (dispatch) => {
    dispatch(pageChange(page));
    return dispatch(doFilter(PAGE));
}

const changeCustomHeaders = (value) => ({
    type: FILTERS_CUSTOM_HEADERS,
    payload: {
        value
    }
});

const searchName = (value) => (dispatch) => {
    dispatch(search(value));
    return dispatch(doFilter(ALL));
}

const search = (value) => ({
    type: FILTERS_SEARCH,
    payload: { value }
});

const changeSignal = (value) => ({
    type: FILTERS_CHANGE_SIGNAL,
    payload: { value }
});

const changeSort = (value) => ({
    type: FILTERS_CHANGE_SORT,
    payload: { value }
})

export const actions = {
    onSelect,
    onRemove,
    onPageChange,
    applyFilters,
    changeCustomHeaders,
    searchName,
    changeSignal,
    changeSort
};
