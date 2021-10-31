import ApiError from './apiError';
import { ErrorResponse, Method } from './types';

const API_BASE_URL = 'http://localhost:3000/v1';

function client<
  R extends Record<string, unknown> = Record<string, never>,
  P = undefined
>(method: Method, path: `/${string}`, payload?: P): Promise<R>;
async function client<R = Record<string, never>, P = undefined>(
  method: Method,
  path: string,
  payload?: P
): Promise<R> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload && JSON.stringify(payload),
  });
  if (res.status < 200 || res.status >= 300) {
    const errData = (await res.json()) as ErrorResponse;
    throw new ApiError(errData.message);
  }
  return res.json() as Promise<R>;
}

export default client;
