import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../atoms/authState';
import { useWalletNetwork } from '../atoms/networkState';
import { auth } from '../lib/api';
import enableKlaytn from '../lib/enableKlaytn';
import nonceMessageTemplate from '../lib/nonceMessageTemplate';

async function signNonce(walletAddress: string) {
  const nonce = (await auth.challengeNonce(walletAddress)).nonce;
  const message = nonceMessageTemplate(walletAddress, nonce);
  return caver.klay.sign(message, walletAddress);
}

export default function useKlaytnLogin() {
  const { authorize } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [, setNetwork] = useWalletNetwork();
  const history = useHistory();
  const login = useCallback(async (): Promise<boolean> => {
    try {
      console.log('test1');
      const walletAddress = await enableKlaytn();
      console.log('test2');
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

      setNetwork(klaytn.networkVersion);
      return true;
    } catch (err) {
      enqueueSnackbar('거부되었습니다.', { variant: 'error' });
      return false;
    }
  }, [enqueueSnackbar, authorize, history, setNetwork]);

  return login;
}
