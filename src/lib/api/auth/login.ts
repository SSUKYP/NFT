import client from '../client';

type LoginResponce = {
  access_token: string;
};
type LoginPayload = {
  walletAddress: Hex;
  signature: Hex;
  chain?: string;
};

export default async function login(payload: LoginPayload) {
  const res = await client<LoginResponce, LoginPayload>(
    'POST',
    '/auth/login',
    payload
  );
  return res;
}
