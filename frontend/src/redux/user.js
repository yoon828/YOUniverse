import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = { name: '', age: 0, email: '' };
// const setUser = "setUser" //로그인
// const getUser = "getUser"; // 유저 정보 불러오기

export const userReducer = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    //사용자 정보를 받아서 redux에 넣어주기
    login: (state, action) => {
      state.value = action.payload;
    },
    //redux에 있는 값을 제거
    logout: (state) => {
      state.value = initialState;
    }
  }
});
export const { login, logout } = userReducer.actions;
export default userReducer.reducer;
