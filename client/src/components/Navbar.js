import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm p-4 fixed w-full top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-brand-blue">
          AfriCharge
        </Link>
        <nav className="flex space-x-8 items-center font-medium text-slate-600">
          <NavLink to="/find-stations" className={({isActive}) => isActive ? "text-brand-blue" : "hover:text-brand-blue transition-colors"}>
            Find Stations
          </NavLink>
          <NavLink to="/about" className={({isActive}) => isActive ? "text-brand-blue" : "hover:text-brand-blue transition-colors"}>
            About
          </NavLink>

          {user ? (
            <>
              {user.user.is_admin && (
                <NavLink to="/stations/new" className={({isActive}) => isActive ? "text-brand-blue" : "hover:text-brand-blue transition-colors"}>
                  Add Station
                </NavLink>
              )}
              <NavLink to="/dashboard" className={({isActive}) => isActive ? "text-brand-blue" : "hover:text-brand-blue transition-colors"}>
                <FaTachometerAlt className="inline-block mr-1" />
                Dashboard
              </NavLink>
              <button onClick={logout} className="hover:text-brand-blue transition-colors flex items-center">
                <FaSignOutAlt className="inline-block mr-1" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-brand-blue transition-colors">
                Login
              </NavLink>
              <Link to="/signup" className="bg-brand-blue text-white py-2 px-5 rounded-full hover:bg-brand-blue-dark transition-colors font-semibold">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;