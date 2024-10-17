import React from 'react';
import { GasStation } from '../types';

interface GasStationListProps {
  gasStations: GasStation[];
  onSelectStation: (station: GasStation) => void;
}

const GasStationList: React.FC<GasStationListProps> = ({ gasStations, onSelectStation }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <h2 className="text-xl font-semibold p-4 bg-blue-600 text-white">Listado de Estaciones</h2>
      <div className="overflow-y-auto h-[550px]">
        {gasStations.map((station) => (
          <div
            key={station.IDEESS}
            className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectStation(station)}
          >
            <h3 className="font-semibold">{station.Rótulo}</h3>
            <p className="text-sm text-gray-600">{station.Dirección}, {station.Municipio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GasStationList;