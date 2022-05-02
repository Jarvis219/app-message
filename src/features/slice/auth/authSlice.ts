import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authConfig } from '../../../models/user';

export interface AuthState {
  isLogin: boolean;
  current: authConfig;
  loginSuccess: boolean;
}

const initialState: AuthState = {
  isLogin: false,
  current: {} as authConfig,
  loginSuccess: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<authConfig>) {
      state.isLogin = true;
      state.loginSuccess = false;
    },
    loginSuccess(state, action: PayloadAction<authConfig>) {
      state.isLogin = true;
      state.current = action.payload;
      state.loginSuccess = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLogin = false;
      state.current = {} as authConfig;
      state.loginSuccess = false;
    },
    logout(state) {
      state.isLogin = false;
      state.current = {} as authConfig;
      state.loginSuccess = false;
    },
  },
});

// actions
export const authActions = authSlice.actions;

// selectors
export const authSelectors = (state: any) => state.auth.current;

// reducer
const authReducer = authSlice.reducer;
export default authReducer;
