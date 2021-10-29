import { Button, ButtonProps } from '@mui/material';
import React, { Ref } from 'react';
import { KlaytnIcon } from './KlaytnIcon';

export const KaikasLoginButton = React.forwardRef(function LoginButton(
  props: Omit<ButtonProps, 'startIcon' | 'children'>,
  ref: Ref<HTMLButtonElement>
) {
  return (
    <Button {...props} ref={ref} startIcon={<KlaytnIcon />}>
      Kaikas 지갑 연결
    </Button>
  );
});
