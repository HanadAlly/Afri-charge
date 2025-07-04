import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6 text-blue-800">About AfriCharge</h1>
        <p className="text-lg mb-6 leading-relaxed text-gray-700">
          AfriCharge is revolutionizing Africa's electric vehicle (EV) infrastructure by connecting drivers with a network of autonomous, solar-powered charging stations. Our innovative platform addresses the critical need for reliable, sustainable charging solutions across both urban centers and underserved rural communities.
        </p>
        
        <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
          <p className="italic text-blue-800">
            "Empowering Africa's electric mobility revolution through smart, sustainable charging solutions."
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Our Vision</h2>
        <p className="text-lg mb-6 leading-relaxed text-gray-700">
          We're building an ecosystem where electric mobility is accessible, affordable, and environmentally sustainable across the African continent. By combining autonomous technology with solar energy, AfriCharge creates a win-win solution:
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-3 text-blue-600">For EV Owners</h3>
            <p>Seamless access to reliable charging with real-time availability and smart routing</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-3 text-blue-600">For Station Operators</h3>
            <p>Powerful tools to maximize revenue and minimize operational costs</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Key Features</h2>
        <ul className="space-y-4">
          {[
            "Interactive map with live station status and smart routing",
            "Intelligent reservation system with vehicle-specific charging profiles",
            "Community-powered reviews and quality ratings",
            "Comprehensive station management dashboard with analytics",
            "AI-optimized power distribution and load balancing",
            "Solar performance monitoring and battery management"
          ].map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">✓</span>
              <span className="text-lg text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">Our Impact</h2>
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { value: "100+", label: "Stations Deployed" },
              { value: "85%", label: "Solar-Powered" },
              { value: "24/7", label: "Autonomous Operation" }
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-blue-800 mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;