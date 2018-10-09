import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import api from './middlewares/api';
import reducers from './reducers';
import entities from './data/normalizr-dummy';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers, { entities }, composeEnhancers(
    applyMiddleware(thunk, api)
));