client/src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import StationList from './components/StationList';
import StationForm from './components/StationForm';
import StationDetail from './components/StationDetail';
import Login from './components/Login';
import About from './components/About';
import GetStarted from './components/GetStarted';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/find-stations" element={<StationList />} />
        <Route path="/stations/new" element={<StationForm />} />
        <Route path="/stations/:id" element={<StationDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/" element={<GetStarted />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;