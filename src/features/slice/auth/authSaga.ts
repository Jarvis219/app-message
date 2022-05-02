import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, call, put } from 'redux-saga/effects';
import { login } from 'service/auth';
import { getToken, logout } from 'utils/utils';
import { authConfig } from '../../../models/user';
import { authActions } from './authSlice';

export function* authSaga() {
  yield fork(watchLoginFlow);
}

function* watchLoginFlow() {
  while (true) {
    const isLogin = Boolean(getToken());
    if (!isLogin) {
      const action: PayloadAction<authConfig> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }
    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

function* handleLogin(payload: authConfig) {
  try {
    const { data } = yield call(login, payload);
    yield put(authActions.loginSuccess(data));
  } catch ({ message }) {
    yield put(authActions.loginFailure(message as string));
  }
}

function* handleLogout() {
  yield logout();
}
