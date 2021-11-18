import { Button, ButtonProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { Ref, useCallback } from 'react';
import useEthereumLogin from '../../../hooks/useEthereumLogin';
import hasMetamask from '../../../lib/wallet/metamask/hasMetamask';
import { MetamaskIcon } from './MetamaskIcon';

export const MetamaskLoginButton = React.forwardRef(function LoginButton(
  props: Omit<ButtonProps, 'startIcon' | 'children'>,
  ref: Ref<HTMLButtonElement>
) {
  const { enqueueSnackbar } = useSnackbar();
  const login = useEthereumLogin();
  const onClick = useCallback(async () => {
    if (!hasMetamask()) {
      enqueueSnackbar('먼저 Metamask 지갑을 설치해주세요.', {
        variant: 'error',
      });
      return;
    }
    await login();
  }, [enqueueSnackbar, login]);
  return (
    <Button {...props} ref={ref} startIcon={<MetamaskIcon />} onClick={onClick}>
      {'Metamask 지갑 연결'}
    </Button>
  );
});
