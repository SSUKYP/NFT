import client from '../client';

type LoginResponce = {
  access_token: string;
};
type LoginPayload = {
  walletAddress: string;
  signature: string;
  chain?: string;
};

export default async function login(payload: LoginPayload) {
  const res = await client.fetch<LoginResponce, LoginPayload>(
    'POST',
    '/auth/login',
    payload
  );
  return res;
}
