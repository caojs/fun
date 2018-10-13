import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './redux/middlewares/api';
import reducers from './reducers';
import entities from './containers/FilterPage/data/normalizr-dummy';

export default function configureStore(initialState = {}) {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(reducers, { entities }, composeEnhancers(
        applyMiddleware(thunk, api)
    ));
}