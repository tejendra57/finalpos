import { configureStore } from '@reduxjs/toolkit';
import driversReducer from '../features/drivers/driversSlice';
import deliveriesReducer from '../features/deliveries/deliveriesSlice';

export const store = configureStore({
  reducer: {
    drivers: driversReducer,
    deliveries: deliveriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
