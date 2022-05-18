import { configureStore } from '@reduxjs/toolkit';
import publiReducer from '../features/publi/publiSlice';
import userSlice from '../features/user/userSlice';
import requestReducer from '../features/request/requestSlice';
import orderInProgressSlice from '../features/inProgress/orderInProgressSlice';


export const store = configureStore({
  reducer: {
    request: requestReducer,
    publi:  publiReducer,
    user: userSlice,
    orderInProgress: orderInProgressSlice
  },
});
