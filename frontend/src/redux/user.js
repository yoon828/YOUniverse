import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = { name: '', age: 0, email: '' };
// const setUser = "setUser" //로그인
// const getUser = "getUser"; // 유저 정보 불러오기

export const userReducer = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    insertUser: (state, action) => {
      state.value = action.payload;
    }
  }
});
export const { insertUser } = userReducer.actions;
export default userReducer.reducer;
