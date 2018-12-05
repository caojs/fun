import { merge } from 'lodash-es';
import queryString from 'query-string';

import { CALL_API } from '../middlewares/api';

export const REQUEST = '@COMMON/REQUEST';
export const SUCCESS = '@COMMON/SUCCESS';
export const FAILURE = '@COMMON/FAILURE';

export function getA(where, url, config = {}) {
    const {
        params,
        ...rest
    } = config;

    if (params && typeof url === 'function') {
        url = (state) => url(state) + '?' + queryString.stringify(params);
    }

    const options = merge({
        headers: {
            "Content-Type": "application/json"
        }
    }, rest);

    return {
        meta: { where },
        [CALL_API]: {
            endpoint: url,
            types: [REQUEST, SUCCESS, FAILURE],
            options: {
                ...options,
                method: 'GET',
            }
        }
    }
}

export function postA(where, url, data, config = {}) {
    const options = merge({
        headers: {
            "Content-Type": "application/json"
        }
    }, config);

    return {
        meta: { where },
        [CALL_API]: {
            endpoint: url,
            types: [REQUEST, SUCCESS, FAILURE],
            options: {
                ...options,
                method: 'POST',
                body: JSON.stringify(data),
            }
        }
    }
}

export const getP = (where) => (...params) => getA(where, ...params);
export const postP = (where) => (...params) => postA(where, ...params);