import queryString from 'query-string';
import { pick, pickBy } from 'lodash-es';

export function stateToQuery(state) {
    let {
        page,
        selectedFilters: filter = [],
        order = [],
        search = "",
        signal = "",
    } = state;

    let hasValueState = Object.assign(
        {},
        pickBy({
            page,
            search,
            signal,
            filter: filter.sort().join(','),
            order: order.join('_')
        }, item => !!item)
    );

    return queryString.stringify(hasValueState);
}

export function urlToState(url) {
    const { query } = queryString.parseUrl(url);

    const {
        order,
        filter,
        ...rest
    } = pick(query, ['page', 'search', 'signal', 'order', 'filter']);

    return {
        ...rest,
        selectedFilters: filter ? filter.split(',') : [],
        order: order ? order.split('_') : []
    };
}