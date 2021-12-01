import client from '../client';
import { User } from '../types';

export function getUser(walletAddress: string) {
  return client.fetch<User>('GET', `/users/${walletAddress}`);
}
