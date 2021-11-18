import { b64utoutf8, KJUR } from 'jsrsasign';
import { useCallback } from 'react';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import sessionStorageEffect from '../lib/storage/sessionStorageEffect';

type UserPayload = {
  sub: string;
  walletAddress: string;
  username: string;
  chain: 'ETH' | null;
};

const userTokenState = atom<string | null>({
  key: 'userTokenState',
  default: null,
  effects_UNSTABLE: [sessionStorageEffect<string>('accessToken')],
});

export const userState = selector<UserPayload | null>({
  key: 'userState',
  get({ get }) {
    const token = get(userTokenState);
    if (!token) {
      return null;
    }
    return KJUR.jws.JWS.readSafeJSONString(
      b64utoutf8(token.split('.')[1])
    ) as unknown as UserPayload;
  },
});

function useUserTokenState() {
  return useRecoilState(userTokenState);
}

export function useUserState() {
  return useRecoilValue(userState);
}

export default function useAuth() {
  const [, setUserTokenState] = useUserTokenState();
  const authorize = useCallback(
    (token: string) => {
      setUserTokenState(token);
    },
    [setUserTokenState]
  );
  const logout = useCallback(() => {
    setUserTokenState(null);
  }, [setUserTokenState]);

  return {
    authorize,
    logout,
  };
}
