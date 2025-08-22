import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
       
        <Link to="/" className="text-2xl font-bold text-blue-600">
          DreamHome
        </Link>

      
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
              <Link to="/about" className="hover:text-blue-600 transition duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-600 transition duration-200">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <Link
          to={currentUser ? "/profile" : "/sign-in"}
          className="  hover:text-blue-600 flex items-center transition duration-200"
        >
          {currentUser ? (
            <>
              <img
                src={currentUser.profilePicture || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              
            </>
          ) : (
            "Sign In"
          )}
        </Link>
      </div>
    </header>
  );
}
