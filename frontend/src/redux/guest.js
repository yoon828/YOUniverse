import { createSlice } from '@reduxjs/toolkit';

// guest.js - 비회원 방 참가시 닉네임
const initialState = {
  guestName: window.sessionStorage.getItem('guestName')
};

export const guestReducer = createSlice({
  name: 'guest',
  initialState: { value: initialState },
  reducers: {
    saveGuestName: (state, action) => {
      state.guestName = action.payload;
      window.sessionStorage.setItem('guestName', state.guestName);
    }
  }
});
export const { saveGuestName } = guestReducer.actions;
export default guestReducer.reducer;
