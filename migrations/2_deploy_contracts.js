const MyNft = artifacts.require('./MyNft.sol');
const fs = require('fs');

module.exports = function (deployer) {
  deployer.deploy(MyNft, 'MyKlay', 'MKlay');
};
