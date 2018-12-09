import 'react-app-polyfill/ie11';
import 'cross-fetch/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import ReactGA from 'react-ga';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';
import routes from './routes';

import './styles/index.scss';

ReactGA.initialize('UA-130658907-1');

const history = createBrowserHistory();
history.listen((location) => {
    ReactGA.pageview(location.pathname);
});

const store = configureStore();

ReactDOM.render(
    <Router history={history}>
        <Provider store={store}>
            {renderRoutes(routes)}
        </Provider>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
