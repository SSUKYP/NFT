export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Nft = {
  id: string;
  creatorId: string;
  ownerId: string;
  tokenId: number;
  price: number;
  type: string;
  createdAt: string;
  creator: User;
  likedUserIDs: string[];
  name: string;
  description: string;
  image: string;
  _count: {
    likedUsers: number;
  };
};

export type User = {
  id: string;
  username?: string;
  walletAddress: string;
  nickname?: string;
  _count?: {
    likedNfts: number;
    ownedNfts: number;
    createdNfts: number;
  };
  likedNfts?: Nft[];
  ownedNfts?: Nft[];
  createdNfts?: Nft[];
  createdAt?: string;
};
