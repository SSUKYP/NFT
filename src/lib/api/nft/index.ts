import client from '../client';
import { Nft } from '../types';

export function getNft(tokenId: string) {
  return client.fetch<Nft>('GET', `/nfts/${encodeURIComponent(tokenId)}`);
}

type GetNftListParams = {
  take?: string;
  skip?: string;
  cursor?: string;
  owner?: string;
  creator?: string;
  name?: string;
  sortBy?: 'likes';
};
export async function getNftList(params: GetNftListParams) {
  const queryParams = new URLSearchParams(params);
  const data = await client.fetch<Nft[]>('GET', `/nfts?${queryParams}`);
  for (const nft of data) {
    nft.price = Number.parseFloat(
      caver.utils.convertFromPeb(
        await window.ksea.methods.tokenIdToPrice(nft.tokenId).call(),
        'KLAY'
      )
    );
  }
  return data;
}

export function createNft(name: string, description: string, image: File) {
  const data = new FormData();
  data.append('name', name);
  data.append('description', description);
  data.append('image', image);

  return client.fetch<Nft, FormData>('POST', '/nfts', data, {});
}

export function toggleNftLike(tokenId: number) {
  return client.fetch<Nft>('PUT', `/nfts/${tokenId}/toggleLike`, undefined, {});
}
