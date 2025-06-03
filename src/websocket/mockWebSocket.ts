import { store } from '../app/store';
import { updateDriver } from '../features/drivers/driversSlice';
import { Driver } from '../types/Driver';

const statuses: Driver['status'][] = ['Idle', 'Delivering', 'Paused'];

function getRandomLatLng(lat: number, lng: number) {
  return {
    lat: lat + (Math.random() - 0.5) * 0.01,
    lng: lng + (Math.random() - 0.5) * 0.01,
  };
}

export function startMockWebSocket() {
  setInterval(() => {
    const state = store.getState();
    const drivers = state.drivers.drivers;

    drivers.forEach(driver => {
      const updatedLocation = getRandomLatLng(driver.lat, driver.lng);
      const updatedDriver: Driver = {
        ...driver,
        ...updatedLocation,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      };
      store.dispatch(updateDriver(updatedDriver));
    });
  }, 500000);
}
