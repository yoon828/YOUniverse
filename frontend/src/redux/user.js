import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = {
  uuid: '',
  email: '',
  imagePath: null,
  name: '',
  url: '',
  shareRoomHistoryList: [],
  qnAList: [],
  sessionId: ''
};

export const userReducer = createSlice({
  name: 'user',
  initialState: { value: initialState },
  reducers: {
    insertUser: (state, action) => {
      state.value = action.payload;
    },
    resetUser: (state) => {
      state.value = initialState;
    }
  }
});
export const { insertUser, resetUser } = userReducer.actions;
export default userReducer.reducer;
