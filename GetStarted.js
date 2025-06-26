import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Get Started with AfriCharge</h1>
      <p className="text-lg mb-6">
        Join the future of electric mobility in Africa! Whether you're an EV owner looking for reliable charging stations or a station operator ready to manage your infrastructure, AfriCharge has you covered.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
        >
          Sign Up
        </Link>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
        <p className="text-lg mb-4">
          1. <strong>Sign Up</strong>: Create an account as an EV owner or station operator.<br />
          2. <strong>Locate Stations</strong>: Use our interactive map to find available charging stations.<br />
          3. <strong>Reserve & Charge</strong>: Book a slot and charge your vehicle with ease.<br />
          4. <strong>Manage & Monitor</strong>: Station owners can track performance and optimize operations.
        </p>
      </div>
    </div>
  );
};

export default GetStarted;