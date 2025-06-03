export type DeliveryStatus = 'Pending' | 'Delivering' | 'Completed';

export interface Delivery {
  id: string;
  description: string;
  assignedDriverId: string | null;
  status: DeliveryStatus;
  eta: string;
}
