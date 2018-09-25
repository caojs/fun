import { combineReducers } from 'redux';
import './helpers/immutability-helper-extend';
import filters from './ducks/filters';

export default combineReducers({
    filters
});