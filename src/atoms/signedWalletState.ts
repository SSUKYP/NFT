import { useEffect } from 'react';
import { selector, useRecoilValue } from 'recoil';
import useAuth, { userState } from './authState';

export type WalletChain = 'ETH' | 'KLAY' | null;

const signedWalletState = selector<WalletChain>({
  key: 'signedWalletState',
  get: ({ get }) => {
    const user = get(userState);
    if (user) {
      return user.chain === 'ETH' ? 'ETH' : 'KLAY';
    } else {
      return null;
    }
  },
});

export function useSignedWallet() {
  return useRecoilValue(signedWalletState);
}

export function useChainEffect() {
  const signedWallet = useSignedWallet();
  const { logout } = useAuth();

  useEffect(() => {
    if (signedWallet === 'ETH') {
      window.caver = new Caver(ethereum);
    } else if (signedWallet === 'KLAY') {
      window.caver = new Caver(klaytn);
    } else {
      logout();
    }
  }, [signedWallet, logout]);
}
