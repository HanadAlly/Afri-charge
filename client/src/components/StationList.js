import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function StationList() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5555/api/stations")
      .then((response) => response.json())
      .then((data) => setStations(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const defaultPosition = [-1.2921, 36.8219]; // Nairobi coordinates

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-africharge-blue mb-6">
        Find Charging Stations
      </h2>
      <div className="w-full h-96 mb-6">
        <MapContainer
          center={defaultPosition}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          className="rounded-lg shadow-md"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.map((station) => (
            <Marker
              key={station.id}
              position={
                [
                  station.location.split(",")[0],
                  station.location.split(",")[1],
                ] || defaultPosition
              }
            >
              <Popup className="text-africharge-gray">
                <strong>{station.name}</strong>
                <br />
                Location: {station.location}
                <br />
                Price: ${station.price} ({station.type})
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stations.map((station) => (
          <li key={station.id} className="p-4 bg-white shadow rounded-lg">
            <h3 className="text-xl font-semibold text-africharge-blue">
              {station.name}
            </h3>
            <p className="text-africharge-gray">Location: {station.location}</p>
            <p className="text-africharge-gray">Price: ${station.price}</p>
            <p className="text-africharge-gray">Type: {station.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StationList;
