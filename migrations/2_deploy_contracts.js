const MyNft = artifacts.require('./MyNft.sol');
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(MyNft).then(() => {
    if (MyNft._json) {
      // 1. Record recently deployed contract's abi file to 'deployedABI'
      fs.writeFile('deployedABI', JSON.stringify(MyNft._json.abi, 2), err => {
        if (err) throw err;
        console.log(
          `The abi of ${MyNft._json.contractName} is recorded on deployedABI file`
        );
      });
    }

    // 2. Record recently deployed contract's address to 'deployedAddress'
    fs.writeFile('deployedAddress', MyNft.address, err => {
      if (err) throw err;
      console.log(
        `The deployed contract address * ${MyNft.address} * is recorded on deployedAddress file`
      );
    });
  });
};
