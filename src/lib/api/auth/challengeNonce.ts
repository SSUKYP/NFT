import client from '../client';

type ChallengeNonceResponce = {
  nonce: number;
};
type ChallengeNoncePayload = {
  walletAddress: string;
};

export default async function challengeNonce(walletAddress: string) {
  const res = await client<ChallengeNonceResponce, ChallengeNoncePayload>(
    'POST',
    '/auth/challengeNonce',
    {
      walletAddress,
    }
  );
  return res;
}
