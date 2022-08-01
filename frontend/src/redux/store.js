import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

//만든 reducer 추가해주기
export default configureStore({
  reducer: {
    user: userReducer
  }
});
