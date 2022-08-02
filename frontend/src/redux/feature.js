import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = { bigMouth: false };

export const featureReducer = createSlice({
  name: 'feature',
  initialState: { value: initialState },
  reducers: {
    //mouth 확대 기능 set
    toggleMouth: (state) => {
      state.value.bigMouth = !state.value.bigMouth;
    }
  }
});
export const { toggleMouth } = featureReducer.actions;
export default featureReducer.reducer;
