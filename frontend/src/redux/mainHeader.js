import { createSlice } from '@reduxjs/toolkit';

//header.js - 메인 헤더 상태
const initialState = {
  mainHeader: true
};

export const mainHeaderReducer = createSlice({
  name: 'mainHeader',
  initialState: initialState,
  reducers: {
    myMainHeader: (state, action) => {
      state.mainHeader = action.payload;
    }
  }
});
export const { myMainHeader } = mainHeaderReducer.actions;
export default mainHeaderReducer.reducer;
