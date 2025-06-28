import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StationList from './components/StationList';
import StationForm from './components/StationForm';
import About from './components/About';
import GetStarted from './components/GetStarted';
import Login from './components/Login';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user || !user.user.is_admin) {
        return <Navigate to="/" replace />;
    }
    return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} />
      <div className="min-h-screen flex flex-col pt-20">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<GetStarted />} />
            <Route path="/find-stations" element={<StationList />} />
            <Route
              path="/stations/new"
              element={<AdminRoute><StationForm /></AdminRoute>}
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;