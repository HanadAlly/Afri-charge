import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function StationList() {
  const [stations, setStations] = useState([]);
  const [filteredStations, setFilteredStations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/stations')
      .then((res) => res.json())
      .then((data) => {
        setStations(data);
        setFilteredStations(data);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setFilteredStations(
      stations.filter(station =>
        station.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        station.location.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-4">AfriCharge Map</h1>
      <button className="btn-primary mb-4 float-right" onClick={() => window.location.href = '/stations/new'}>Add Station</button>
      <input
        type="text"
        placeholder="Search locations..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex">
        <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Nearby Stations</h2>
          {filteredStations.map((station) => (
            <div key={station.id} className="station-card">
              <h3 className="font-bold">{station.name}</h3>
              <p className="text-gray-600">{station.location}</p>
              <p className={station.is_available ? 'text-green-600' : 'text-red-600'}>
                {station.is_available ? 'available' : 'busy'}
              </p>
              <p>Distance: {Math.random() * 10} km</p>
              <p>Type: {station.type}</p>
              <p>Price: ${station.price}/kWh</p>
              <button className="btn-secondary mt-2 w-full">Reserve Spot</button>
            </div>
          ))}
        </div>
        <div className="w-3/4 p-4">
          <MapContainer center={[1.286, 36.817]} zoom={4} style={{ height: '400px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {filteredStations.map((station) => {
              const [lat, lon] = station.location.split(', ').map(Number);
              return (
                <Marker key={station.id} position={[lat, lon]}>
                  <Popup>{station.name} - {station.is_available ? 'Available' : 'Busy'}</Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <p className="text-center text-gray-600 mt-2">Interactive Map<br />Map integration will show real-time charging station locations and availability across Africa.</p>
        </div>
      </div>
    </div>
  );
}

export default StationList;

