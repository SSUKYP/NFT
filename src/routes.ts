import { RouteComponentProps } from 'react-router';
import AccountPage from './pages/AccountPage';
import DetailPage from './pages/DetailPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MarketPage from './pages/MarketPage';

type Route = {
  path: string;
  component: React.ComponentType<RouteComponentProps>;
  exact?: boolean;
  private?: boolean;
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
    private: true,
  },
  {
    path: '/market',
    component: MarketPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/details',
    component: DetailPage,
  },
];
export default routes;
