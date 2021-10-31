import { atom, useRecoilState } from 'recoil';

export type Wallet = 'kaikas' | 'metamask';

const signedWalletState = atom<Wallet | null>({
  key: 'signedWalletState',
  default: null,
});

export function useSignedWallet() {
  return useRecoilState(signedWalletState);
}
