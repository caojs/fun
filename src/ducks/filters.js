import update from 'immutability-helper';
import { flow, get, join, pickBy, isString, reduce, mapKeys, mapValues } from 'lodash/fp';
import queryString from 'query-string';
import { RSAA } from 'redux-api-middleware';
import { handleAction, combineActions, createAction } from 'redux-actions';

import { filterApi } from '../apiConfig';
import { filter_list as filterList , filter_options as filterOptions } from '../data/filter.json';
import dummy from '../filter/dummy.json';

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
        customHeaderIds: [0],
        isLoading: false,
        isLoaded: false,
        response: null,
        error: null,
    }
};

const apiActions = (loadingType = "ALL") => ({
    requestAction: (type) => ({
        type,
        meta: () => ({
            isLoading: true,
            loadingType
        })
    }),
    successAction: (type) => ({
        type,
        meta: () => ({
            isLoading: false,
            isLoaded: true,
            loadingType
        })
    }),
    failureAction: (type) => ({
        type,
        meta: () => ({
            isLoading: false,
            loadingType
        })
    })
});

const resultReducer = handleAction(
    combineActions(FILTERS_REQUEST, FILTERS_SUCCESS, FILTERS_FAILURE),
    (state, { payload, error, meta }) => {
        return update(state, {
            $merge: error ?
                { ...meta, error: payload } :
                {
                    ...meta,
                    ...payload ? {response: payload} : null,
                    error: null
                }
            })
    },
    {});


//results, main
export default (state = initialState, action) => {
    let {
        type,
        payload,
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
        case FILTERS_SUCCESS:
        case FILTERS_FAILURE:
        {
            return {
                ...state,
                results: resultReducer(state.results, action)
            };
        }

        case FILTERS_CUSTOM_HEADERS:
        {
            return update(state, {
                results: {
                    customHeaderIds: {
                        $set: payload
                    }
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

const queryFilterFromState = (state) => {
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

const doFilter = (loadingType = ALL) => {
    let { requestAction, successAction, failureAction } = apiActions(loadingType);
    return ({
        [RSAA]: {
            method: 'GET',
            endpoint: queryFilterFromState,
            types: [
                requestAction(FILTERS_REQUEST),
                successAction(FILTERS_SUCCESS),
                failureAction(FILTERS_FAILURE)
            ],
            fetch: async (...args) => {
                // const res = await fetch(...args);
                // const json = await res.json();
                await new Promise((res) => {
                    setTimeout(() => res(), 1000);
                });
                return new Response(JSON.stringify(dummy), {
                    status: 200,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                });
            }
        }
    })
};

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

const changeCustomHeaders = createAction(FILTERS_CUSTOM_HEADERS);

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
