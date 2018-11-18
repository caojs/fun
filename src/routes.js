import App from './containers/App';
import FilterPage from './containers/FilterPage';
import PortfolioPage from './containers/PortfolioPage';
import OptimizePage from './containers/OptimizePage';

const routes = [{
    component: App,
    routes: [{
        path: '/filter',
        component: FilterPage,
    }, {
        path: '/portfolio',
        component: PortfolioPage
    }, {
        path: '/optimize',
        component: OptimizePage
    }]
}];

export default routes;