import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import bookingReducer from './bookingSlice';
import destinationReducer from './destinationSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    destination:destinationReducer
  },
});

export default store;