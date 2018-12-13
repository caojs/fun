import { rootApi } from '../../configs/urls';

const callApi = (endpoint, options) => {
    const fullUrl = (endpoint.indexOf(rootApi) === -1) ? rootApi + endpoint : endpoint;

    return fetch(fullUrl, options)
        .then(response => response
            .json()
            .then(json => ({
                status: response.status,
                ok: response.ok,
                json
            }))
        )
        .then(response => response.ok ?
            { data: response.json }:
            Promise.reject(new Error('Server error.'))
        )
        .catch(err => Promise.reject(err))
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

    return callApi(endpoint, options)
        .then(({ data }) => next(actionWith({
            type: successType,
            payload: { data },
        })))
        .catch(error => next(actionWith({
            type: failureType,
            payload: { error: error.message || 'Something bad happened'}
        })))
}
