import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { utils, writeFile } from 'xlsx';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { GasStation } from './types';
import GasStationList from './components/GasStationList';
import GasStationMap from './components/GasStationMap';

function App() {
  const [gasStations, setGasStations] = useState<GasStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<GasStation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestresHist/15-10-2024');
        setGasStations(response.data.ListaEESSPrecio);
        saveAsJSON(response.data.ListaEESSPrecio);
        saveAsExcel(response.data.ListaEESSPrecio);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const saveAsJSON = (data: GasStation[]) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gas_stations.json';
    link.click();
  };

  const saveAsExcel = (data: GasStation[]) => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Gas Stations');
    writeFile(workbook, 'gas_stations.xlsx');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Estaciones de Servicio</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <GasStationList
            gasStations={gasStations}
            onSelectStation={setSelectedStation}
          />
        </div>
        <div className="w-full md:w-2/3 h-[600px]">
          <GasStationMap
            gasStations={gasStations}
            selectedStation={selectedStation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;