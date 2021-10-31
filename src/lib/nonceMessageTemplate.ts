export default function nonceMessageTemplate(
  walletAddress: Hex,
  nonce: number
) {
  return `Welcome to KlaySea!

Click "Sign" to sign in. No password needed!
This request will not trigger a blockchain transaction or cost any gas fees.

Wallet address:
${walletAddress}

Nonce:
${nonce}`;
}
