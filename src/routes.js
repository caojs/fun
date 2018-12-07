import App from './containers/App';
import HomePage from './containers/HomePage';
import PostsPage from './containers/PostsPage';
import PostDetailPage from './containers/PostDetailPage';
import FilterPage from './containers/FilterPage';
import PortfolioPage from './containers/PortfolioPage';
import OptimizePage from './containers/OptimizePage';
import SignIn from './containers/Login/SignIn';
import Register from './containers/Login/Register';

const routes = [{
    component: App,
    routes: [{
        path: '/',
        exact: true,
        component: HomePage
    }, {
        path: '/news',
        exact: true,
        component: PostsPage
    }, {
        path: '/news/:slug',
        component: PostDetailPage
    }, {
        path: '/filter',
        component: FilterPage,
    }, {
        path: '/portfolio',
        component: PortfolioPage
    }, {
        path: '/optimization',
        component: OptimizePage
    },{
        path: '/login',
        component: SignIn
    },{
        path: '/register',
        component: Register
    }]
}];

export default routes;