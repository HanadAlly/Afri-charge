import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About AfriCharge</h1>
      <p className="text-lg mb-4">
        AfriCharge is a pioneering platform designed to connect electric vehicle (EV) owners with autonomous, solar-powered charging stations across Africa. Our mission is to bridge the gap in EV infrastructure by providing reliable, sustainable, and accessible charging solutions for both urban and rural areas.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
      <p className="text-lg mb-4">
        We envision a future where electric mobility is seamless and sustainable across Africa. By leveraging autonomous technology and solar power, AfriCharge ensures that EV owners have access to smart, eco-friendly charging stations while empowering station owners with tools to manage and optimize their infrastructure.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
      <ul className="list-disc list-inside text-lg mb-4">
        <li>Interactive map to locate charging stations with real-time availability.</li>
        <li>Reservation system for booking charging slots with vehicle-specific details.</li>
        <li>User reviews and ratings to share experiences.</li>
        <li>Station management tools for owners, including usage analytics and maintenance alerts.</li>
        <li>AI-driven smart charging for optimal power distribution.</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Why AfriCharge?</h2>
      <p className="text-lg">
        AfriCharge is built for EV owners, station operators, and sustainable energy advocates. Our platform promotes green energy, scalability, and user-friendly experiences, making it the ideal solution for Africa’s growing EV market.
      </p>
    </div>
  );
};

export default About;