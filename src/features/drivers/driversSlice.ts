import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Driver } from '../../types/Driver';

interface DriversState {
  drivers: Driver[];
  selectedDriverId: string | null;
}

const initialState: DriversState = {
  drivers: [],
  selectedDriverId: null,
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers(state, action: PayloadAction<Driver[]>) {
      state.drivers = action.payload;
    },
    updateDriver(state, action: PayloadAction<Driver>) {
      const index = state.drivers.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.drivers[index] = action.payload;
      }
    },
    selectDriver(state, action: PayloadAction<string>) {
      state.selectedDriverId = action.payload;
    },
    updateDriverStatus(state, action: PayloadAction<{ id: string; status: Driver['status'] }>) {
      const driver = state.drivers.find(d => d.id === action.payload.id);
      if (driver) {
        driver.status = action.payload.status;
      }
    },
    markDeliveryCompleted(state, action: PayloadAction<string>) {
      const driver = state.drivers.find(d => d.id === action.payload);
      if (driver) {
        driver.status = 'Idle';
      }
    },
    reassignDelivery(state, action: PayloadAction<{ fromId: string; toId: string }>) {
      const fromDriver = state.drivers.find(d => d.id === action.payload.fromId);
      const toDriver = state.drivers.find(d => d.id === action.payload.toId);
      if (fromDriver && toDriver) {
        fromDriver.status = 'Idle';
        toDriver.status = 'Delivering';
      }
    },
    updateAssignmentStatus(
      state,
      action: PayloadAction<{ id: string; assigned: boolean }>
    ) {
      const driver = state.drivers.find(d => d.id === action.payload.id);
      if (driver) {
        driver.status = action.payload.assigned ? 'Delivering' : 'Idle';
      }
    },
  },
});

export const { setDrivers, updateDriver, selectDriver, updateDriverStatus, markDeliveryCompleted, reassignDelivery, updateAssignmentStatus} = driversSlice.actions;
export default driversSlice.reducer;
