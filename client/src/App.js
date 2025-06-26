import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import StationList from "./components/StationList";
import StationForm from "./components/StationForm";
import About from "./components/About";
import GetStarted from "./components/GetStarted";
import Login from "./components/Login";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/find-stations" element={<StationList />} />
        <Route path="/stations/new" element={<StationForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
