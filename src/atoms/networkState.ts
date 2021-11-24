import { useEffect } from 'react';
import { atom, SetterOrUpdater, useRecoilState } from 'recoil';
import ethereumProviderProxy from '../lib/ethereumProviderProxy';
import useAuth from './authState';
import { useSignedWallet } from './signedWalletState';

const networkState = atom<KlaytnNetworkVersion | null>({
  key: 'networkState',
  default: null,
});

export function useWalletNetwork(): [
  KlaytnNetworkVersion,
  SetterOrUpdater<KlaytnNetworkVersion>
] {
  const signedWallet = useSignedWallet();
  const [networkVersion, setNetworkVersion] = useRecoilState(networkState);
  const { logout } = useAuth();

  useEffect(() => {
    const callback = function (
      newNetworkVersion: KlaytnNetworkVersion | string
    ) {
      if (typeof newNetworkVersion === 'string') {
        newNetworkVersion = Number.parseInt(newNetworkVersion);
      }
      if (networkVersion !== newNetworkVersion) {
        setNetworkVersion(newNetworkVersion);
      }
    };

    switch (signedWallet) {
      case 'KLAY': {
        window.caver = new Caver(klaytn);
        klaytn.on('networkChanged', callback);
        if (klaytn.networkVersion) {
          setNetworkVersion(klaytn.networkVersion);
        }
        return () => {
          klaytn.off('networkChanged', callback);
        };
      }

      case 'ETH': {
        window.caver = new Caver(ethereumProviderProxy());
        ethereum.on('chainChanged', callback);
        setNetworkVersion(Number.parseInt(ethereum.chainId));
        return () => {
          ethereum.removeListener('chainChanged', callback);
        };
      }

      default: {
        logout();
        return null;
      }
    }
  }, [networkVersion, setNetworkVersion, signedWallet, logout]);
  return [networkVersion, setNetworkVersion];
}
