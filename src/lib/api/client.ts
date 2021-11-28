import ApiError from './apiError';
import { ErrorResponse, Method } from './types';

type ClientContext = {
  authToken: string;
};

class Client {
  context: ClientContext;

  constructor() {
    this.context = {
      authToken: undefined,
    };
  }

  setAuthToken(token: string) {
    if (!token) return;
    this.context.authToken = token;
  }

  fetch<
    R extends Record<string, unknown> = Record<string, never>,
    P = undefined
  >(method: Method, path: `/${string}`, payload?: P): Promise<R>;

  async fetch<R = Record<string, never>, P = undefined>(
    method: Method,
    path: string,
    payload?: P
  ): Promise<R> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    if (this.context?.authToken) {
      headers.append('Authorization', `Bearer ${this.context.authToken}`);
    }
    const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers,
      body: payload && JSON.stringify(payload),
    });
    if (res.status < 200 || res.status >= 300) {
      const errData = (await res.json()) as ErrorResponse;
      throw new ApiError(errData.message);
    }
    return res.json() as Promise<R>;
  }
}

const client = new Client();
export default client;
