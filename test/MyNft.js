const MyNft = artifacts.require('./MyNft.sol');

contract('MyNft', accounts => {
  const name = 'MyNft';
  const symbol = 'MyNft';

  it('deploy and mint KIP17 token', async () => {
    const account = accounts[1];
    const tokenId = 1111;
    const tokenUri = 'tokenUri';

    // 토큰 인스턴스 생성
    token = await MyNft.new(name, symbol);

    // account에 민팅
    await token.mintWithTokenURI(account, tokenId, tokenUri, {
      from: accounts[0],
    });

    expect(await token.symbol()).to.equal(symbol);
    expect(await token.name()).to.equal(name);
    expect(await token.tokenURI(tokenId)).to.equal(tokenUri);
    expect(await token.ownerOf(tokenId)).to.equal(account);
  });
});
