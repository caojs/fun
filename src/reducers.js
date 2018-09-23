export default function (state = {}, action) {
    let {
        type,
        payload
    } = action;

    switch (type) {
        case "ON_FILTER_SELECT": 
            let {
                type: filterType,
                name,
                value
            } = payload;

            let filters = state.filters || {};
            let o = filters[filterType] || {};

            filters = {
                ...filters,
                [filterType]: {
                    ...o,
                    [name]: value
                }
            };

            return {
                ...state,
                filters
            };

        default:
            return state;
    }
}