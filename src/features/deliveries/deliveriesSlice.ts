// src/features/deliveries/deliveriesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Delivery, DeliveryStatus } from '../../types/Delivery';

interface DeliveriesState {
  deliveries: Delivery[];
}

const initialState: DeliveriesState = {
  deliveries: [],
};

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    setDeliveries(state, action: PayloadAction<Delivery[]>) {
      state.deliveries = action.payload;
    },
    updateDelivery(state, action: PayloadAction<Delivery>) {
      const index = state.deliveries.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.deliveries[index] = action.payload;
      }
    },
    reassignDelivery(state, action: PayloadAction<{ deliveryId: string; newDriverId: string | null }>) {
      const delivery = state.deliveries.find(d => d.id === action.payload.deliveryId);
      if (delivery) {
        delivery.assignedDriverId = action.payload.newDriverId;
        delivery.status = action.payload.newDriverId ? 'Delivering' : 'Pending';
      }
    },
    markDeliveryCompleted(state, action: PayloadAction<string>) {
      const delivery = state.deliveries.find(d => d.id === action.payload);
      if (delivery) {
        delivery.status = 'Completed';
      }
    },
  },
});

export const { setDeliveries, updateDelivery, reassignDelivery, markDeliveryCompleted } = deliveriesSlice.actions;
export default deliveriesSlice.reducer;
