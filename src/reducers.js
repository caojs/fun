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

            let filter = state.filter || {};
            let o = filter[filterType] || {};

            filter = {
                ...filter,
                [filterType]: {
                    ...o,
                    [name]: value
                }
            };

            return {
                ...state,
                filter
            };

        default:
            return state;
    }
}