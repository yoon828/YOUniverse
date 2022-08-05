import { createSlice } from '@reduxjs/toolkit';
import { getRefreshToken, deleteToken } from 'common/functions/functions';

export const authReducer = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: !!getRefreshToken() },
  reducers: {
    login: (state) => {
      state.isLoggedIn = !!getRefreshToken();
    },
    logout: (state) => {
      deleteToken();
      state.isLoggedIn = !!getRefreshToken();
    }
  }
});
export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
