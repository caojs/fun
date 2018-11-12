import App from './containers/App';
import FilterPage from './containers/FilterPage';
import PortfolioPage from './containers/PortfolioPage';

const routes = [{
    component: App,
    routes: [{
        path: '/filter',
        component: FilterPage,
    }, {
        path: '/portfolio',
        component: PortfolioPage
    }]
}];

export default routes;