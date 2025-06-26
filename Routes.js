import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GetStarted from './GetStarted';
import About from './About';
import Login from './Login';
import StationForm from './StationForm';
import Dashboard from './Dashboard'; // Placeholder for Dashboard component
import MapView from './MapView'; // Placeholder for MapView component

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-station" element={<StationForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<MapView />} />
      <Route path="/signup" element={<div>Sign Up Page (TBD)</div>} />
    </Routes>
  );
};

export default AppRoutes;