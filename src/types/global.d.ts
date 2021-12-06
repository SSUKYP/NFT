type Caver = import('caver-js').default;
type IpcProvider = import('caver-js').IpcProvider;
type Contract = import('caver-js').Contract;

declare enum KlaytnNetworkVersion {
  BAOBAB = 1001,
  CYPRESS = 8217,
}

interface KlaytnProvider extends IpcProvider {
  networkVersion: KlaytnNetworkVersion;
  selectedAddress: string;
  enable(): Promise<void>;
  on(event: string, callback: (...args: unknown[]) => void): KlaytnProvider;
  off(event: string, callback: (...args: unknown[]) => void): KlaytnProvider;
  once(event: string, callback: (...args: unknown[]) => void): KlaytnProvider;

  isKaikas: boolean;
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface Window {
  klaytn: KlaytnProvider;
  caver: Caver;
  ksea: Contract;
  ethereum: any;
}

declare const Caver: new (provider?: KlaytnProvider) => Caver;

declare const klaytn: KlaytnProvider;
declare const caver: Caver;
declare const ksea: Contract;
declare const ethereum: any;
