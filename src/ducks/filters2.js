import { createAction, createActions, handleAction } from 'redux-actions';
import update from 'immutability-helper';
import { flow, get, join, pickBy, isString, reduce, mapKeys, mapValues } from 'lodash/fp';
import queryString from 'query-string';

import { CALL_API } from '../middlewares/api';
import { filterApi } from '../apiConfig';
import { filter_list as filterList , filter_options as filterOptions } from '../data/filter.json';

export const FILTER_SELECT = "FILTER_SELECT";
export const FILTER_REMOVE_SELECTED = "FILTER_REMOVE_SELECTED";
export const FILTER_QUERY_REQUEST = "FILTER_REQUEST";
export const FILTER_QUERY_SUCCESS = "FILTER_SUCCESS";
export const FILTER_QUERY_FAILURE = "FILTER_FAILURE";
export const FILTER_PAGE_CHANGE = "FILTER_PAGE_CHANGE";
export const FILTER_SELECT_CUSTOM_HEADERS = "FILTER_SELECT_CUSTOM_HEADERS";
export const FILTER_SEARCH = "FILTER_SEARCH";
export const FILTER_CHANGE_SIGNAL = "FILTER_CHANGE_SIGNAL";
export const FILTER_CHANGE_SORT = "FILTER_CHANGE_SORT";
