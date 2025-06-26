import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-africharge-blue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          AfriCharge
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/find-stations" className="hover:underline">
              Find Stations
            </Link>
          </li>
          <li>
            <Link to="/stations/new" className="hover:underline">
              Add Station
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
