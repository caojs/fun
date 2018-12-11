import { filterQuerySelector } from './selectors';
import {
    ON_FILTER_SELECT,
    REMOVE_ACTIVATED_FILTER,
    FILTERS_REQUEST,
    FILTERS_SUCCESS,
    FILTERS_FAILURE,
    FILTERS_CHANGE_SIGNAL,
    FILTERS_CHANGE_ORDER,
    FILTERS_CUSTOM_HEADERS,
    FILTERS_PAGE_CHANGE,
    FILTERS_SEARCH,
    ALL,
    PAGE
} from './constants';

import { CALL_API } from '../../redux/middlewares/api';

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
            let url = '/filtering';
            let query = filterQuerySelector(state);
            let u = query ? url + "?" + query : url;

            
            //return u;
            return 'http://5bd3f794be3a0b0013d034d9.mockapi.io/api/v1/filter/1'
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
    type: FILTERS_CHANGE_ORDER,
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