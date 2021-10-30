import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AppHeader from './layouts/AppHeader';
import routes from './routes';
import './App.css';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Switch>
          {routes.map((route, i) =>
            route.private ? (
              <PrivateRoute
                key={i}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            ) : (
              <Route
                key={i}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            )
          )}
        </Switch>
      </main>
    </>
  );
}

export default App;
