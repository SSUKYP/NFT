const HDWalletProvider = require('truffle-hdwallet-provider-klaytn');

require('dotenv').config();

const NETWORK_ID = '1001';

/**
 * klaytn 네트워크 API URL
 */
const URL = 'https://api.baobab.klaytn.net:8651';

/**
 * klaytn지갑 private 키
 */
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  networks: {
    baobab: {
      provider: () => new HDWalletProvider(PRIVATE_KEY, URL),
      network_id: NETWORK_ID,
      gas: '8500000',
      gasPrice: null,
    },
  },

  // solidity 컴파일 설정
  compilers: {
    solc: {
      version: '0.5.6',
    },
  },
};
