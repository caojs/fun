import { combineReducers } from 'redux';
import './helpers/immutability-helper-extend';
import filters from './ducks/filters';

export default (state, action) => ({
    filters: filters(state.filters, action),
    entities: state.entities
});
// export default combineReducers({
//     filters
// });