import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="flex items-center">
        <span className="text-xl font-bold">:zap: AfriCharge</span>
      </div>
      <div className="space-x-4">
        <Link to="/find-stations" className="hover:text-gray-300">Find Stations</Link>
        <Link to="/about" className="hover:text-gray-300">About</Link>
        <Link to="/login" className="hover:text-gray-300">Sign In</Link>
        <Link to="/get-started" className="btn-primary">Get Started</Link>
      </div>
    </nav>
  );
}

export default Navbar;