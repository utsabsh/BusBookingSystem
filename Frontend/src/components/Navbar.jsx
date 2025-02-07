import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">
          <h2>Bus Booking</h2>
        </div>
        <ul
          className={`flex space-x-6 text-white md:flex-row ${
            isMenuOpen
              ? "flex flex-col absolute top-20 left-0 w-full bg-gray-800"
              : "hidden md:flex"
          }`}
        >
          <li>
            <Link to={"/home"} className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"} className="hover:text-orange-500">
              Admin Dashboard
            </Link>
          </li>
          <li>
            <Link to={"/booking"} className="hover:text-orange-500">
              booking
            </Link>
          </li>
          <li>
            <Link to={"/home"} className="hover:text-orange-500">
              Profile
            </Link>
          </li>
        </ul>
        <div className="md:hidden flex items-center" onClick={toggleMenu}>
          <button className="text-white focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
