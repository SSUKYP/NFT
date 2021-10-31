type Hex = `0x${number}`;

declare class SignatureData {
  constructor(signature: string[] | SignatureData);

  emptySig: SignatureData;

  isEmpty(): boolean;
  encode(): string[];
  toString(): string;

  get v(): string;
  set v(v);
  get V(): string;
  set V(v);
  get r(): string;
  set r(r);
  get R(): string;
  set R(r);
  get s(): string;
  set s(s);
  get S(): string;
  set S(s);
}

interface Utils {
  isAddress(address: Hex): boolean;
}

interface Wallet {
  signMessage(
    address: Hex,
    message: string,
    role: number,
    index?: number
  ): {
    messageHash: Hex;
    signature: SignatureData;
    message: string;
  };

  keyring: {
    role: {
      roleTransactionKey: number;
    };
  };
}

declare enum KlaytnNetworkVersion {
  BAOBAB = 1001,
  CYPRESS = 8217,
}

interface KlaytnProvider {
  networkVersion: KlaytnNetworkVersion;
  selectedAddress: Hex;
  enable(): Promise<void>;
  on(
    event: 'networkChanged',
    callback: (networkVersion: number) => void
  ): KlaytnProvider;
  off(
    event: 'networkChanged',
    callback: (networkVersion: number) => void
  ): KlaytnProvider;

  isKaikas: boolean;
}

interface Klay {
  sign(message: string, address: Hex): Hex;
}

type RequestProvider = string | KlaytnProvider;

declare class Caver {
  static utils: Utils;
  version: string;
  wallet: Wallet;
  klay: Klay;

  constructor(provider?: RequestProvider, net?: string);
}

interface Window {
  klaytn: KlaytnProvider;
  caver: Caver;
}

declare const klaytn: KlaytnProvider;
declare const caver: Caver;
