export interface authConfig {
  _id?: string;
  uid?: string;
  name: string;
  email?: string;
  avatar?: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: authToken;
}

export interface authToken {
  token: string;
  expiresIn?: number;
  refreshToken: string;
}
