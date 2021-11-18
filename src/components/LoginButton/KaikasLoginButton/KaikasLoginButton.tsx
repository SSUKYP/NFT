import { Button, ButtonProps } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { Ref, useCallback } from 'react';
import useKlaytnLogin from '../../../hooks/useKlaytnLogin';
import hasKaikas from '../../../lib/wallet/kaikas/hasKaikas';
import { KlaytnIcon } from './KlaytnIcon';

export const KaikasLoginButton = React.forwardRef(function LoginButton(
  props: Omit<ButtonProps, 'startIcon' | 'children'>,
  ref: Ref<HTMLButtonElement>
) {
  const { enqueueSnackbar } = useSnackbar();
  const login = useKlaytnLogin();
  const onClick = useCallback(async () => {
    if (!hasKaikas()) {
      enqueueSnackbar('먼저 Kaikas 지갑을 설치해주세요.', {
        variant: 'error',
      });
      return;
    }
    await login();
  }, [enqueueSnackbar, login]);
  return (
    <Button {...props} ref={ref} startIcon={<KlaytnIcon />} onClick={onClick}>
      {'Kaikas 지갑 연결'}
    </Button>
  );
});
