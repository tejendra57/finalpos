import React, { useEffect } from 'react';
import MapView from './components/MapView';
import DriverList from './components/DriverList';
import DeliveryList from './components/DeliveryList';

import { useAppDispatch } from './hooks/reduxHooks';
import { setDrivers } from './features/drivers/driversSlice';
import { setDeliveries } from './features/deliveries/deliveriesSlice';

import { mockDrivers, mockDeliveries } from './mockData';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDrivers(mockDrivers));
    dispatch(setDeliveries(mockDeliveries));
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Tejenda Shrestha</h1>
      
      <div className="flex">
        <div className="w-1/2 bg-blue-200 p-4"><MapView /></div>
        <div className="w-1/2 bg-blue-200 p-4"><DriverList /></div>       
      </div>
      <div className="w-full bg-green-200 p-4"><DeliveryList /></div>

    </div>
  );
};

export default App;
