import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useAuth from '../atoms/authState';
import { auth } from '../lib/api';
import nonceMessageTemplate from '../lib/nonceMessageTemplate';

async function signNonce(walletAddress: string) {
  const nonce = (await auth.challengeNonce(walletAddress)).nonce;
  const message = nonceMessageTemplate(walletAddress, nonce);

  const params = [message, walletAddress];
  const method = 'personal_sign';
  return ethereum.request({ method, params, from: walletAddress });
}

async function checkChain() {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x3E9' }],
    });
  } catch (switchError) {
    if (switchError.code === 4902) {
      await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainName: 'Klaytn Baobab',
            chainId: '0x3E9',
            rpcUrls: ['https://api.baobab.klaytn.net:8651'],
            blockExplorerUrls: ['https://baobab.scope.klaytn.com/'],
            nativeCurrency: {
              name: 'Klaytn',
              symbol: 'KLAY',
              decimals: 18,
            },
          },
        ],
      });
    } else {
      throw switchError;
    }
  }
}

export default function useEthereumLogin() {
  const { authorize } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const login = useCallback(async (): Promise<boolean> => {
    try {
      await checkChain();
      await ethereum.request({ method: 'eth_requestAccounts' });
      const walletAddress = ethereum.selectedAddress.toLowerCase();
      const signature = await signNonce(walletAddress);
      const res = await auth.login({
        walletAddress,
        signature,
        chain: 'ETH',
      });
      authorize(res.access_token);
      history.replace('/');
      return true;
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
      return false;
    }
  }, [enqueueSnackbar, authorize, history]);

  return login;
}
