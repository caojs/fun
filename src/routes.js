import App from './containers/App';
import HomePage from './containers/HomePage';
import FilterPage from './containers/FilterPage';
import PortfolioPage from './containers/PortfolioPage';
import OptimizePage from './containers/OptimizePage';

const routes = [{
    component: App,
    routes: [{
        path: '/',
        exact: true,
        component: HomePage
    }, {
        path: '/filter',
        component: FilterPage,
    }, {
        path: '/portfolio',
        component: PortfolioPage
    }, {
        path: '/optimization',
        component: OptimizePage
    }]
}];

export default routes;