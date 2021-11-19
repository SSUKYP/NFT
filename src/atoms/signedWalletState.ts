import { selector, useRecoilValue } from 'recoil';
import { userState } from './authState';

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
