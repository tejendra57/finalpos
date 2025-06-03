import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectDriver, updateDriverStatus, } from '../features/drivers/driversSlice';
import { markDeliveryCompletedOptimistically, reassignDeliveryOptimistically, } from '../features/drivers/driversThunks';

const DriverList: React.FC = () => {
  const drivers = useAppSelector(state => state.drivers.drivers);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Drivers</h2>
      {drivers.map(driver => (

        <div key={driver.id} className="p-4 border rounded shadow">
          <div><strong>{driver.name}</strong></div>
          <div>Status: {driver.status}</div>
          <div>ETA: {driver.eta}</div>
          <div className="w-full md:w-auto space-x-2">
          <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded" onClick={() => dispatch(selectDriver(driver.id))}>View on Map</button>
          <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded" onClick={() => dispatch(updateDriverStatus({ id: driver.id, status: 'Delivering' }))}>Mark Delivering</button>
          <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded" onClick={() => dispatch(updateDriverStatus({ id: driver.id, status: 'Paused' }))}>Pause</button>
          <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded" onClick={() => dispatch(updateDriverStatus({ id: driver.id, status: 'Idle' }))}>Idle</button>
          <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
            onClick={() => dispatch(markDeliveryCompletedOptimistically(driver.id))}>
            Complete Delivery
          </button>
            </div>
        </div>
      ))}
    </div>
  );
};

export default DriverList;
