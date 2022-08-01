import { createSlice } from '@reduxjs/toolkit';

//초기값
const initialState = { mouthBig: false };

export const featureReducer = createSlice({
  name: 'feature',
  initialState: { value: initialState },
  reducers: {
    //mouth 확대 기능 set
    setMouth: (state, action) => {
      state.value.mouthBig = action.payload;
    }
  }
});
export const { setMouth } = featureReducer.actions;
export default featureReducer.reducer;
