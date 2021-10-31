import { useEffect, useState } from 'react';

export default function useKlaytnNetworkState() {
  const [networkVersion, setNetworkVersion] = useState(klaytn.networkVersion);
  useEffect(() => {
    const callback = function (newNetworkVersion: KlaytnNetworkVersion) {
      if (networkVersion !== newNetworkVersion) {
        setNetworkVersion(newNetworkVersion);
      }
    };
    klaytn.on('networkChanged', callback);
    return () => {
      klaytn.off('networkChanged', callback);
    };
  }, [networkVersion]);
  return networkVersion;
}
