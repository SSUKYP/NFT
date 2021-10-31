import client from '../client';

type ChallengeNonceResponce = {
  nonce: number;
};
type ChallengeNoncePayload = {
  walletAddress: Hex;
};

export default async function challengeNonce(walletAddress: Hex) {
  const res = await client<ChallengeNonceResponce, ChallengeNoncePayload>(
    'POST',
    '/auth/challengeNonce',
    {
      walletAddress,
    }
  );
  return res;
}
