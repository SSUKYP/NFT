import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../atoms/authState';
import { auth } from '../lib/api';
import enableKlaytn from '../lib/enableKlaytn';
import nonceMessageTemplate from '../lib/nonceMessageTemplate';

async function signNonce(walletAddress: Hex) {
  const nonce = (await auth.challengeNonce(walletAddress)).nonce;
  const message = nonceMessageTemplate(walletAddress, nonce);
  return caver.klay.sign(message, walletAddress);
}

export default function useKlaytnLogin() {
  const { authorize } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const login = useCallback(async (): Promise<boolean> => {
    try {
      const walletAddress = await enableKlaytn();
      if (!walletAddress) {
        return false;
      }

      const signature = await signNonce(walletAddress);
      const res = await auth.login({
        walletAddress,
        signature,
      });

      authorize(res.access_token);
      history.replace('/');
      return true;
    } catch (err) {
      console.error(err);
      enqueueSnackbar(err.message, { variant: 'error' });
      return false;
    }
  }, [enqueueSnackbar, authorize, history]);

  return login;
}
