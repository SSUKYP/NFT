import { useSnackbar } from 'notistack';
import { useEffect, useMemo } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useUserState } from '../../atom/authState';

export type PrivateRouteProps = {
  path: string;
  component?: React.ComponentType | undefined;
  exact?: boolean;
};
export default function PrivateRoute(props: PrivateRouteProps) {
  const { enqueueSnackbar } = useSnackbar();
  const userState = useUserState();
  const isLoggedIn = useMemo(() => userState !== null, [userState]);

  useEffect(() => {
    if (!isLoggedIn) {
      enqueueSnackbar('로그인해주세요.', { variant: 'info' });
    }
  }, [isLoggedIn, enqueueSnackbar]);

  return isLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect path={props.path} to="/login" exact={props.exact} />
  );
}
