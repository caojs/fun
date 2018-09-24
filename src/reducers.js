export default function (state = {}, action) {
    let {
        type,
        payload
    } = action;

    switch (type) {
        case "ON_FILTER_SELECT": {
            let {
                filterType,
                filterId,
                optionId
            } = payload;

            let filters = state.filters || {};
            let o = filters[filterType] || {};

            filters = {
                ...filters,
                [filterType]: {
                    ...o,
                    [filterId]: optionId
                }
            };

            return {
                ...state,
                filters
            };
        }

        case "REMOVE_ACTIVATED_FILTER": {
            let {
                filterType,
                filterId
            } = payload;
            
            let filters = state.filters || {};
            let o = filters[filterType] || {};

            filters = {
                ...filters,
                [filterType]: {
                    ...o,
                    [filterId]: null
                }
            };

            return {
                ...state,
                filters
            };
        }

        default:
            return state;
    }
}