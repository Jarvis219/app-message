import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authConfig } from '../../../models/user';

export interface UserState {
  loading: boolean;
  current: authConfig | undefined;
  error: string | undefined;
}

const initialState: UserState = {
  loading: false,
  current: undefined,
  error: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    listUser(state) {
      state.loading = true;
    },
    listUserSuccess(state, action: PayloadAction<authConfig>) {
      state.loading = false;
      state.current = action.payload;
    },
    listUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// actions
export const userActions = userSlice.actions;

// selector
export const users = (state: any) => state.user.current;

// reducer
const userReducer = userSlice.reducer;
export default userReducer;
