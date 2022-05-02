import instance from './instance';

export const list = (id: string) => {
  const url = '/list/users?id=' + id;
  return instance.get(url);
};
