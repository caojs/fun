import 'react-app-polyfill/ie11';
import 'cross-fetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import routes from './routes';

//import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

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
