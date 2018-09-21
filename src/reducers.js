export default function (state = {}, action) {
    let {
        type,
        payload
    } = action;

    switch (action.type) {
        case "ON_FILTER_SELECT": 
            let filter = state.filter || {};
            let { name, value } = payload;
            filter[name] = value;
            return {
                ...state,
                filter
            };

        default:
            return state;
    }
}