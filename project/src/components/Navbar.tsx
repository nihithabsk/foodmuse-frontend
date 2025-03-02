import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Utensils className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">FOODMUSE</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;