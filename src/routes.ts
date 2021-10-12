import AccountPage from './pages/AccountPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketPage from './pages/MarketPage';

type Route = {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
};
const routes: readonly Route[] = [
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  {
    path: '/account',
    component: AccountPage,
  },
  {
    path: '/market',
    component: MarketPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];
export default routes;
