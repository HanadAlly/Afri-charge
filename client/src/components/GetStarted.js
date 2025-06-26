import React from "react";
import { Link } from "react-router-dom";

function GetStarted() {
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Get Started with AfriCharge</h2>
      <p>
        Find charging stations or add your own. Start by logging in or signing
        up!
      </p>
      <button className="bg-green-500 text-white p-2 rounded mt-4">
        <Link to="/login">Get Started</Link>
      </button>
    </div>
  );
}

export default GetStarted;
