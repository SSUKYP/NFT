import { useEffect, useState } from 'react';
import { useSignedWallet } from '../atoms/signedWalletState';

export default function useWalletNetworkState() {
  const [signedWallet] = useSignedWallet();
  const [networkVersion, setNetworkVersion] =
    useState<KlaytnNetworkVersion>(null);
  useEffect(() => {
    const callback = function (newNetworkVersion: KlaytnNetworkVersion) {
      if (networkVersion !== newNetworkVersion) {
        setNetworkVersion(newNetworkVersion);
      }
    };

    switch (signedWallet) {
      case 'kaikas': {
        klaytn.on('networkChanged', callback);
        return () => {
          klaytn.off('networkChanged', callback);
        };
      }

      case 'metamask': {
        ethereum.on('chainChanged', callback);
        return () => {
          ethereum.removeListener('chainChanged', callback);
        };
      }

      default: {
        return null;
      }
    }
  }, [networkVersion, signedWallet]);
  return networkVersion;
}
