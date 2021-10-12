import { Route, Switch } from 'react-router-dom';
import AppHeader from './layouts/AppHeader';
import routes from './routes';

function App() {
  return (
    <>
      <AppHeader />
      <main>
        <Switch>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              component={route.component}
              exact={route.exact}
            ></Route>
          ))}
        </Switch>
      </main>
    </>
  );
}

export default App;
