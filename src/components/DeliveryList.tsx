import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectDriver, updateDriverStatus, } from '../features/drivers/driversSlice';
import { reassignDelivery, markDeliveryCompleted, updateDelivery } from '../features/deliveries/deliveriesSlice';
import { markDeliveryCompletedOptimistically, reassignDeliveryOptimistically, assignDelivery } from '../features/drivers/driversThunks';
import { Driver } from '../types/Driver';

const DeliveryList: React.FC = () => {
  const deliveries = useAppSelector(state => state.deliveries.deliveries);
  const drivers = useAppSelector(state => state.drivers.drivers);
  const dispatch = useAppDispatch();

  const handleReassign = (deliveryId: string, newDriverId: string) => {
    dispatch(reassignDelivery({ deliveryId, newDriverId }));
    dispatch(assignDelivery({ id: newDriverId, assigned: true }));
  };

  const handleComplete = (deliveryId: string, assignedDriverId: any) => {
    dispatch(markDeliveryCompleted(deliveryId));
    dispatch(updateDriverStatus({ id: assignedDriverId || '', status: 'Idle' }))
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Deliveries</h2>
      <div className="space-y-4">
        {deliveries.map(delivery => {
          const assignedDriver = drivers.find(d => d.id === delivery.assignedDriverId);
          return (
            <div key={delivery.id} className="p-4 border rounded shadow">
              <div><strong>{delivery.description}</strong></div>
              <div>Status: {delivery.status}</div>
              <div>ETA: {delivery.eta}</div>
              <div>
                Assigned Driver:{' '}
                <select className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" value={delivery.assignedDriverId || ''}
                  onChange={e => handleReassign(delivery.id, e.target.value)}
                  disabled={delivery.status === 'Completed'}
                >
                  <option value="">Unassigned</option>
                  {drivers.map(driver => (
                    <option key={driver.id} value={driver.id}>{driver.name}
                    </option>
                  ))}
                </select>

                {delivery.status !== 'Completed' && (
                  <div className='flex space-x-4'>
                    <button
                      className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => handleComplete(delivery.id, delivery.assignedDriverId || '')}
                    >
                      Mark Completed
                    </button>
                    <button className="mt-2 px-2 py-1 bg-green-500 text-white rounded"
                      onClick={() => {
                        const other = drivers.find(d => d.id !== delivery.assignedDriverId);
                        if (other) {
                          dispatch(reassignDeliveryOptimistically({ fromId: delivery.assignedDriverId || '', toId: other.id }));
                        }
                      }}>
                      Reassign to Another
                    </button>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryList;
