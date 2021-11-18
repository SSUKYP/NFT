import { useEffect } from 'react';
import { atom, SetterOrUpdater, useRecoilState } from 'recoil';
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
        klaytn.on('networkChanged', callback);
        return () => {
          klaytn.off('networkChanged', callback);
        };
      }

      case 'ETH': {
        ethereum.on('chainChanged', callback);
        return () => {
          ethereum.removeListener('chainChanged', callback);
        };
      }

      default: {
        return null;
      }
    }
  }, [networkVersion, setNetworkVersion, signedWallet]);
  return [networkVersion, setNetworkVersion];
}
