import ApiError from './apiError';
import { ErrorResponse, Method } from './types';

type ClientContext = {
  authToken: string;
  defaultHeaders: Headers;
};

class Client {
  context: ClientContext;

  constructor() {
    this.context = {
      authToken: undefined,
      defaultHeaders: new Headers({
        'Content-Type': 'application/json',
      }),
    };
  }

  setAuthToken(token: string) {
    if (!token) return;
    this.context.authToken = token;
  }

  async fetch<
    R extends Record<string, unknown> | Record<string, unknown>[] = Record<
      string,
      never
    >,
    P = undefined
  >(
    method: Method,
    path: `/${string}`,
    payload?: P,
    headers?: HeadersInit
  ): Promise<R> {
    let body: string | FormData = undefined;
    if (!headers) {
      headers = this.context.defaultHeaders;
    }
    if (this.context?.authToken) {
      if (headers instanceof Headers) {
        headers.append('Authorization', `Bearer ${this.context.authToken}`);
      } else if (Array.isArray(headers)) {
        headers.push(['Authorization', `Bearer ${this.context.authToken}`]);
      } else {
        headers['Authorization'] = `Bearer ${this.context.authToken}`;
      }
    }
    if (payload instanceof FormData) {
      body = payload;
    } else {
      body = payload && JSON.stringify(payload);
    }
    const res = await fetch(`${process.env.API_BASE_URL}${path}`, {
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers,
      body,
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
