export const mockDrivers = [
  { id: '1', name: 'Alice', lat: 47.5615, lng: -52.7126, status: 'Delivering', eta: '15 mins' },
  { id: '2', name: 'Bob', lat: 47.5620, lng: -52.7130, status: 'Delivering', eta: '25 mins' },
  { id: '3', name: 'Charlie', lat: 47.5630, lng: -52.7110, status: 'Paused', eta: '10 mins' },
];

export const mockDeliveries = [
  { id: '1', description: 'Order 1', assignedDriverId: '2', status: 'Delivering', eta: '25 mins' },
  { id: '2', description: 'Order 2', assignedDriverId: null, status: 'Pending', eta: 'N/A' },
  { id: '3', description: 'Order 3', assignedDriverId: '1', status: 'Delivering', eta: '15 mins' },
];
