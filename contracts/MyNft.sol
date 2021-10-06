pragma solidity 0.5.6;
import '@klaytn/contracts/token/KIP17/KIP17Token.sol';

contract MyNft is KIP17Token {
  // name과 symbol을 초기화
  constructor(string memory name, string memory symbol)
    public
    KIP17Token(name, symbol)
  {}
}
