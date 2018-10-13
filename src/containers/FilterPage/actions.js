import { get, join, pickBy } from 'lodash/fp';
import queryString from 'query-string';
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
    ALL,
    PAGE
} from './constants';

import { CALL_API } from '../../redux/middlewares/api';
import { filterApi } from '../../configs/apiConfig';

export const onSelect = (value) => ({
    type: ON_FILTER_SELECT,
    payload: value
});

export const onRemove = (value) => ({
    type: REMOVE_ACTIVATED_FILTER,
    payload: value
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
            let filters = {filter: join(',', get('filters.selectedFilters', state))}
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

export const pageChange = (page) => ({
    type: FILTERS_PAGE_CHANGE,
    payload: {
        page
    }
});

export const applyFilters = () => (dispatch) => {
    dispatch(pageChange(0));
    return dispatch(doFilter(ALL));
}

export const onPageChange = (page) => (dispatch) => {
    dispatch(pageChange(page));
    return dispatch(doFilter(PAGE));
}

export const changeCustomHeaders = (value) => ({
    type: FILTERS_CUSTOM_HEADERS,
    payload: {
        value
    }
});

export const searchName = (value) => (dispatch) => {
    dispatch(search(value));
    return dispatch(doFilter(ALL));
}

export const search = (value) => ({
    type: FILTERS_SEARCH,
    payload: { value }
});

export const changeSignal = (value) => ({
    type: FILTERS_CHANGE_SIGNAL,
    payload: { value }
});

export const changeSort = (value) => ({
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