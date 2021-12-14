import client from '../client';
import { Nft } from '../types';

export function getNft(tokenId: string) {
  return client.fetch<Nft>('GET', `/nfts/${encodeURIComponent(tokenId)}`);
}

type GetNftListParams = {
  take: string;
  skip?: string;
  cursor?: string;
  owner?: string;
  creator?: string;
  name?: string;
  sortBy?: 'likes';
};
export function getNftList(params: GetNftListParams) {
  const queryParams = new URLSearchParams(params);
  return client.fetch<Nft[]>('GET', `/nfts?${queryParams}`);
}

export function getAllNfts() {
  return client.fetch<Nft[]>('GET', `/nfts`);
}

export function createNft(
  name: string,
  description: string,
  image: File,
  price: string
) {
  const data = new FormData();
  data.append('image', image);
  data.append('name', name);
  data.append('description', description);
  data.append('price', price);

  return client.fetch<Nft, FormData>('POST', '/nfts', data, {});
}

export function toggleNftLike(tokenId: number) {
  return client.fetch<Nft>('PUT', `/nfts/${tokenId}/toggleLike`, undefined, {});
}
