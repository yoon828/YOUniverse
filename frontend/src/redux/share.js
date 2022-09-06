import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = { shareModal: false };

export const shareModalReducer = createSlice({
  name: 'share',
  initialState: { value: initialState },
  reducers: {
    toggleModal: (state) => {
      state.value.shareModal = !state.value.shareModal;
    }
  }
});
export const { toggleModal } = shareModalReducer.actions;
export default shareModalReducer.reducer;
