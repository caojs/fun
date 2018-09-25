import update from 'immutability-helper';

export const ON_FILTER_SELECT = "ON_FILTER_SELECT";
export const REMOVE_ACTIVATED_FILTER = "REMOVE_ACTIVATED_FILTER";

const initialState = {};

export default (state = initialState, action) => {
    let {
        type,
        payload
    } = action;

    switch(type) {
        case ON_FILTER_SELECT:
        case REMOVE_ACTIVATED_FILTER:
        {
            let {
                filterType,
                filterId,
                optionId = null
            } = payload;

            return update(state, {
                $auto: {
                    [filterType]: {
                        $auto: {
                            [filterId]: { $set: optionId }
                        }
                    }
                }
            });
        }

        default:
            return state;
    }
}

const onSelect = (filterType, filterId, optionId) => ({
    type: ON_FILTER_SELECT,
    payload: {
        filterType,
        filterId,
        optionId
    }
});

const onRemove = (filterType, filterId) => () => ({
    type: REMOVE_ACTIVATED_FILTER,
    payload: {
        filterType,
        filterId
    }
});

export const actions = {
    onSelect,
    onRemove
};
