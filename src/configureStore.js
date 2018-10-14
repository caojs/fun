import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './redux/middlewares/api';
import reducers from './reducers';
import getInitialState from './getInitialState';

export default function configureStore(initialState = {}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(reducers, getInitialState(initialState), composeEnhancers(
        applyMiddleware(thunk, api)
    ));
}