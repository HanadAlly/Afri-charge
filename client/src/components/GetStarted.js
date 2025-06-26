import React from "react";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-africharge-blue mb-6">
        Get Started with AfriCharge
      </h2>
      <p className="text-africharge-gray mb-4">
        Discover charging stations near you or add your own to the network. Join
        the future of sustainable travel today!
      </p>
      <button className="bg-africharge-blue text-white p-3 rounded-lg hover:bg-blue-700">
        <Link to="/login" className="text-white">
          Get Started
        </Link>
      </button>
    </div>
  );
}

export default GetStarted;
