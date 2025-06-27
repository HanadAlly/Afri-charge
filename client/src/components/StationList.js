import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import StationCard from './StationCard';

const availableIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const busyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});

const isValidCoordinates = (location) => {
    if (typeof location !== 'string') return false;
    const parts = location.split(',');
    if (parts.length !== 2) return false;
    const [lat, lon] = parts;
    return !isNaN(parseFloat(lat)) && !isNaN(parseFloat(lon));
}

function StationList() {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("/api/stations")
            .then((response) => response.ok ? response.json() : Promise.reject("Network response was not ok"))
            .then((data) => setStations(data))
            .catch((err) => setError("Failed to fetch stations. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    const defaultPosition = [-1.2921, 36.8219];

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-slate-800 mb-6">Explore Charging Stations</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 h-[75vh] rounded-lg overflow-hidden shadow-lg">
                    <MapContainer center={defaultPosition} zoom={6} style={{ height: "100%", width: "100%" }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {stations
                            .filter(station => isValidCoordinates(station.location))
                            .map((station) => (
                                <Marker
                                    key={station.id}
                                    position={station.location.split(',').map(coord => parseFloat(coord))}
                                    icon={station.is_available ? availableIcon : busyIcon}
                                >
                                    <Popup>
                                        <strong>{station.name}</strong><br />
                                        Price: KSH {station.price}
                                    </Popup>
                                </Marker>
                            ))
                        }
                    </MapContainer>
                </div>
                <div className="lg:col-span-1 h-[75vh] overflow-y-auto space-y-4 pr-2">
                    {loading && <p>Loading stations...</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && stations.map((station) => (
                        <StationCard key={station.id} station={station} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StationList;