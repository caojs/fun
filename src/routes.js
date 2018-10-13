import App from './containers/App';
import FilterPage from './containers/FilterPage';

const routes = [{
    component: App,
    routes: [{
        path: '/filter',
        component: FilterPage
    }]
}];

export default routes;