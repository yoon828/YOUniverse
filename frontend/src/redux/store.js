import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import authReducer from './auth';
import guestReducer from './guest';

//만든 reducer 추가해주기
export default configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    guest: guestReducer
  }
});
