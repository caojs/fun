import dummy from '../filter_result/dummy.json';

const API_ROOT = 'https://api.github.com/'

const callApi = (endpoint, options) => {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint

    if (endpoint === "test")
    {
        return new Promise((res) => {
            setTimeout(() => res(dummy), 1000);
        });
    }

    return fetch(fullUrl, options)
        .then(response => response
            .json()
            .then(json => {
                if (!response.ok) {
                    return Promise.reject(json)
                }

                return json;
            }))
}

export const CALL_API = '[Call API]';

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
        const finalAction = Object.assign({}, action, data)
        delete finalAction[CALL_API]
        return finalAction
    };

    const [ requestType, successType, failureType ] = types;

    next(actionWith({ type: requestType }));

    return callApi(endpoint, options).then(
        response => next(actionWith({
            type: successType,
            payload: { response },
        })),
        error => next(actionWith({
            type: failureType,
            payload: { error: error.message || 'Something bad happened'}
        }))
    )
}
