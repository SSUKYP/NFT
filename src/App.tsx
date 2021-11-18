import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AppHeader from './layouts/AppHeader';
import routes from './routes';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useWalletNetwork } from './atoms/networkState';
import { useChainEffect } from './atoms/signedWalletState';

function App() {
  const { enqueueSnackbar } = useSnackbar();
  const [network] = useWalletNetwork();

  useChainEffect();

  useEffect(
    function watchNetwork() {
      if (network !== null && network !== 1001) {
        enqueueSnackbar(
          '지갑의 네트워크를 클레이튼 테스트넷(Baobab)으로 변경해주세요.',
          { variant: 'error' }
        );
      }
    },
    [network, enqueueSnackbar]
  );

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
