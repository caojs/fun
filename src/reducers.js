import { combineReducers } from 'redux';
import './helpers/immutability-helper-extend';
import filters from './containers/FilterPage/reducers';
import uqReducer, { UQ_KEY } from './redux/usequest/reducer';

export default function(state, action) {
    return combineReducers({
        filters,
        [UQ_KEY]: uqReducer,
        entities: (state = {}) => state
    })(state, action)
};