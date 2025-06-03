import { updateDriverStatus, markDeliveryCompleted, reassignDelivery, updateAssignmentStatus } from './driversSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { DriverStatus } from '../../types/Driver';

// Mark delivery completed
export const markDeliveryCompletedOptimistically = createAsyncThunk(
  'drivers/markDeliveryCompletedOptimistically',
  async (id: string, { dispatch, getState, rejectWithValue }) => {
    const prevDriver = (getState() as RootState).drivers.drivers.find(d => d.id === id);
    if (!prevDriver) return rejectWithValue('Driver not found');
    dispatch(markDeliveryCompleted(id));

    try {
      await new Promise(res => setTimeout(res, 500));
      if (Math.random() < 0.2) throw new Error('Simulated error');
      return { success: true };
    } catch (err) {
      dispatch(updateDriverStatus({ id, status: prevDriver.status }));
      return rejectWithValue('Failed to complete delivery');
    }
  }
);

// Reassign delivery
export const reassignDeliveryOptimistically = createAsyncThunk(
  'drivers/reassignDeliveryOptimistically',
  async (
    { fromId, toId }: { fromId: string; toId: string },
    { dispatch, getState, rejectWithValue }
  ) => {
    const state = getState() as RootState;
    const fromDriver = state.drivers.drivers.find(d => d.id === fromId);
    const toDriver = state.drivers.drivers.find(d => d.id === toId);
    if (!fromDriver || !toDriver) return rejectWithValue('Invalid drivers');

    dispatch(reassignDelivery({ fromId, toId }));

    try {
      await new Promise(res => setTimeout(res, 500));
      if (Math.random() < 0.2) throw new Error('Simulated failure');
      return { success: true };
    } catch (err) {
      // Rollback both
      dispatch(updateDriverStatus({ id: fromId, status: fromDriver.status }));
      dispatch(updateDriverStatus({ id: toId, status: toDriver.status }));
      return rejectWithValue('Failed to reassign');
    }
  }
);

export const updateDriverStatusOptimistically = createAsyncThunk(
  'drivers/updateStatusOptimistically',
  async (
    { id, status }: { id: string; status: DriverStatus },
    { dispatch, getState, rejectWithValue }
  ) => {
    const prevDriver = (getState() as RootState).drivers.drivers.find(d => d.id === id);
    if (!prevDriver) return rejectWithValue('Driver not found');

    // Optimistically update UI
    dispatch(updateDriverStatus({ id, status }));

    try {
      // Simulate API call delay
      await new Promise(res => setTimeout(res, 500));

      // Simulate random failure
      if (Math.random() < 0.2) throw new Error('Simulated error');

      return { success: true };
    } catch (err) {
      // Rollback state on failure
      dispatch(updateDriverStatus({ id, status: prevDriver.status }));
      return rejectWithValue('Failed to update status');
    }
  }
);

// driversThunks.ts
export const assignDelivery = createAsyncThunk(
  'drivers/assignDelivery',
  async (
    { id, assigned }: { id: string; assigned: boolean },
    { dispatch, getState, rejectWithValue }
  ) => {
    const prevStatus = (getState() as RootState).drivers.drivers.find(d => d.id === id)?.status;
    dispatch(updateAssignmentStatus({ id, assigned }));

    try {
      await new Promise(res => setTimeout(res, 500));
      return true;
    } catch (err) {
      // rollback on failure
      dispatch(updateDriverStatus({ id, status: prevStatus || 'Idle' }));
      return rejectWithValue('Failed to assign delivery');
    }
  }
);

