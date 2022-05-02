import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from 'features/slice/auth/authSlice';
import userReducer from 'features/slice/user/userSlice';
import reduxSaga from 'redux-saga';
import rootSaga from './rootSage';

// Create the store saga middleware
const sagaMiddleware = reduxSaga();

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  users: userReducer,
});

// The root reducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: true,
      immutableCheck: true,
    }).concat(sagaMiddleware),
});

// run start the root saga
sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
