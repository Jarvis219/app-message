import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { auth } from 'firebaseConfig';
import { authConfig } from '../models/user';

export const newSocket = io(process.env.REACT_APP_API_SOCKET as string);

export const notifyError = (error: string) => toast.error(error);
export const notifyWarning = (error: string) => toast.warning(error);

export const notifySuccess = (success: string) => toast.success(success, { icon: '🚀' });
export const notifyDefault = (success: string) => toast(success, { icon: '🦄' });

export const getRefreshToken = (): string => {
  return JSON.parse(sessionStorage.getItem('user')!).refreshToken;
};

export const getToken = (): string | boolean => {
  if (!sessionStorage.getItem('user')) {
    return false;
  }
  return JSON.parse(sessionStorage.getItem('user')!).token;
};

export const getID = (): string => {
  if (!sessionStorage.getItem('user')) {
    return '';
  }
  return JSON.parse(sessionStorage.getItem('user')!).user._id;
};

export const logout = () => {
  sessionStorage.clear();
  auth.signOut();
};

export const setUser = (user: authConfig) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): authConfig => {
  return JSON.parse(sessionStorage.getItem('user')!);
};
