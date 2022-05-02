import { authConfig } from 'models';
import instance from './instance';

export const login = (user: authConfig) => {
  const url = '/login';
  return instance.post(url, user);
};
