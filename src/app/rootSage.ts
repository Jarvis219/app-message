import { authSaga } from 'features/slice/auth/authSaga';
import { userSaga } from 'features/slice/user/userSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  console.log(' saga rootSaga');
  yield all([authSaga(), userSaga()]);
}
