import dummy from '../filter/dummy.json';
import { rootApi } from '../apiConfig';

const callApi = (endpoint, options) => {
    const fullUrl = (endpoint.indexOf(rootApi) === -1) ? rootApi + endpoint : endpoint;

    //if (endpoint === "filter")
    // {
        return new Promise((res) => {
            setTimeout(() => res(dummy), 1000);
        });
    // }

    return fetch(fullUrl, options)
        .then(response => response
            .json()
            .then(json => {
                console.log(json);
                if (!response.ok) {
                    return Promise.reject(json)
                }

                return json;
            }))
}

export const CALL_API = '[Redux-actions/Call API]';

export default store => next => action => {
    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint } = callAPI;
    const { types, options } = callAPI;

    if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
    }

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = data => {
        const meta = Object.assign({}, action);
        delete meta[CALL_API];
        return Object.assign({}, { meta }, data);
    };

    const [ requestAction, successAction, failureAction ] = types;

    next(requestAction(actionWith()));

    return callApi(endpoint, options).then(
        response => next(successAction(actionWith({ response }))),
        error => next(failureAction(actionWith({ error: error.message || 'Something bad happened'})))
    )
}
