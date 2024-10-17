import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { GasStation } from '../types';

interface GasStationMapProps {
  gasStations: GasStation[];
  selectedStation: GasStation | null;
}

const GasStationMap: React.FC<GasStationMapProps> = ({ gasStations, selectedStation }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (selectedStation && mapRef.current) {
      const lat = parseFloat(selectedStation.Latitud.replace(',', '.'));
      const lng = parseFloat(selectedStation['Longitud (WGS84)'].replace(',', '.'));
      mapRef.current.setView([lat, lng], 15);
    }
  }, [selectedStation]);

  return (
    <MapContainer
      center={[40.4168, -3.7038]}
      zoom={6}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {gasStations.map((station) => (
        <Marker
          key={station.IDEESS}
          position={[
            parseFloat(station.Latitud.replace(',', '.')),
            parseFloat(station['Longitud (WGS84)'].replace(',', '.'))
          ]}
        >
          <Popup>
            <div>
              <h3 className="font-semibold">{station.Rótulo}</h3>
              <p>{station.Dirección}, {station.Municipio}</p>
              <p>Gasolina 95: {station['Precio Gasolina 95 E5']} €</p>
              <p>Gasóleo A: {station['Precio Gasoleo A']} €</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default GasStationMap;