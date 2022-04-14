import { configureStore } from '@reduxjs/toolkit';
import publiReducer from '../features/publi/publiSlice';
import userSlice from '../features/user/userSlice';


export const store = configureStore({
  reducer: {
    publi:  publiReducer,
    user: userSlice
  },
});
