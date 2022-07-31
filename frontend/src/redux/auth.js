import { createSlice } from '@reduxjs/toolkit';

// auth.js - 토큰 관련 & 로그인 상태 처리 : refresh토큰 있으면 로그인 상태
const initialState = {
  accessToken: localStorage.getItem('accessToken') || '',
  refreshToken: localStorage.getItem('refreshToken') || ''
};

export const authReducer = createSlice({
  name: 'auth',
  initialState: { value: initialState },
  reducers: {
    saveToken: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('accessToken', state.value.accessToken);
      localStorage.setItem('refreshToken', state.value.refreshToken);
    },
    deleteToken: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
    },
    renewToken: (state, action) => {
      state.value.accessToken = action.payload;
      localStorage.setItem('accessToken', state.value.accessToken);
    }
  }
});
export const { saveToken, deleteToken, renewToken } = authReducer.actions;
export default authReducer.reducer;
