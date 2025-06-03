export type DriverStatus = 'Delivering' | 'Paused' | 'Idle' ;

export interface Driver {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: DriverStatus;
  eta: string;
}
