import { configureStore } from '@reduxjs/toolkit';
import publiReducer from '../features/publi/publiSlice';

export const store = configureStore({
  reducer: {
    publi:  publiReducer,
  },
});
