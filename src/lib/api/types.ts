export type ErrorResponse = {
  statusCode: number;
  message: string;
};

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type Nft = {
  name: string;
  description: string;
  image: string;
};
