import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Left - Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DreamHome
        </Link>

        {/* Middle - Navigation */}
        <nav>
          <ul className="flex space-x-8 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-600 transition duration-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-blue-600 transition duration-200">
                Services
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-blue-600 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/Contact" className="hover:text-blue-600 transition duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right - Login Button */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

