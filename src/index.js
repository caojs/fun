import 'react-app-polyfill/ie11';
import 'cross-fetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import 'bootstrap/dist/css/bootstrap.css';
import './common.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import routes from './routes';

const store = configureStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            {renderRoutes(routes)}
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
registerServiceWorker();
