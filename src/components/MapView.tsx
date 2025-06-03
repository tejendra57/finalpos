import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useAppSelector } from '../hooks/reduxHooks';
import { Driver } from '../types/Driver';

// Fix Leaflet default icon issue in many bundlers:
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import highlightedIconUrl from '../assets/c_icon.png'; // Custom icon

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl: iconShadowUrl,
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const HighlightIcon = new L.Icon({
  iconUrl: highlightedIconUrl,
  iconSize: [30, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: iconShadowUrl,
  shadowSize: [41, 41],
});

const FlyToDriver: React.FC<{ driver: Driver | undefined }> = ({ driver }) => {
  const map = useMap();

  useEffect(() => {
    if (driver) {
      map.flyTo([driver.lat, driver.lng], 14, { duration: 1.5 });
    }
  }, [driver]);

  return null;
};

const DriverMap: React.FC = () => {
  const drivers = useAppSelector(state => state.drivers.drivers);
  const selectedDriverId = useAppSelector(state => state.drivers.selectedDriverId);
  const selectedDriver = drivers.find(d => d.id === selectedDriverId);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-2">Driver Map</h2>
    <MapContainer
      center={[47.5615, -52.7126]} // Default to St. John's, NL
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {drivers.map(driver => (
        <Marker
          key={driver.id}
          position={[driver.lat, driver.lng]}
          icon={driver.id === selectedDriverId ? HighlightIcon : DefaultIcon}
        >
          <Popup>
            <strong>{driver.name}</strong>
            <br />
            Status: {driver.status}
            <br />
            ETA: {driver.eta}
          </Popup>
        </Marker>
      ))}

      <FlyToDriver driver={selectedDriver} />
    </MapContainer>
    </div>
  );
};

export default DriverMap;
