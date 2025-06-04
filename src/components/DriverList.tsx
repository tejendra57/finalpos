import React from 'react';
import clsx from "clsx";
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
          <div className="w-full md:w-auto space-x-2"><strong>{driver.name}</strong><button
            className={clsx(
              "px-4 py-2 rounded-full border text-sm font-medium transition-all",
              driver.status === 'Delivering'
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            )}
          >
            {driver.status}
          </button></div>
          
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
