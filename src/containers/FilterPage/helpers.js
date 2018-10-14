import queryString from 'query-string';
import { pick, pickBy } from 'lodash/fp';

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
        pickBy(item => !!item, {
            page,
            search,
            signal,
            filter: filter.sort().join(','),
            order: order.join('_')
        })
    );

    return queryString.stringify(hasValueState);
}

export function urlToState(url) {
    const { query } = queryString.parseUrl(url);

    const {
        order,
        filter,
        ...rest
    } = pick(['page', 'search', 'signal', 'order', 'filter'], query);

    return {
        ...rest,
        selectedFilters: filter ? filter.split(',') : [],
        order: order ? order.split('_') : []
    };
}