import { fork, take, call, put } from 'redux-saga/effects';
import { userActions } from './userSlice';
import { list } from 'service/user';
import { getID } from '../../../utils/utils';

export function* userSaga() {
  yield fork(watchUserFlow);
}

function* watchUserFlow() {
  while (true) {
    yield take(userActions.listUser.type);
    yield fork(handleUser);
  }
}

function* handleUser() {
  try {
    const id: string = yield call(getID);
    const { data } = yield call(list, id);
    yield put(userActions.listUserSuccess(data));
  } catch ({ message }) {
    yield put(userActions.listUserFailure(message as string));
  }
}
