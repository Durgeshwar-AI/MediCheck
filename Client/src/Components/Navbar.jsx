import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("Menu toggled:", !menuOpen);
  };

  return (
    <header className="relative flex items-center justify-between px-4 py-2 bg-white shadow-md">
      {/* Logo */}
      <div className="logo flex items-center">
        <img
          src={logo} // Add your logo here
          alt="Logo"
          className="rounded-b-full h-10 w-10 m-2" // Adjust the width and height of the logo
        />
        <h1 className="text-blue-700 font-bold italic shadow-2xl block text-2xl my-1">
          MediCheck
        </h1>
      </div>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:flex flex-grow justify-end">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="./support"
              className="text-black font-bold hover:text-blue-600"
            >
              Health Support
            </Link>
          </li>
          <li>
            <Link
              to="./team"
              className="text-black font-bold hover:text-blue-600"
            >
              Our Team
            </Link>
          </li>
          <li>
            <Link
              to="./contact"
              className="text-black font-bold hover:text-blue-600"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </nav>

      <div className="join-btn hidden md:block ml-4">
        <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
          Join Us
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="menu-btn md:hidden ml-auto z-20" onClick={toggleMenu}>
        <div className="flex flex-col justify-between w-6 h-5 cursor-pointer">
          <span
            className={`block h-0.5 bg-black transition-transform duration-300 ${
              menuOpen ? "transform rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-black transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 bg-black transition-transform duration-300 ${
              menuOpen ? "transform -rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-10 transition-all duration-300">
          <ul className="flex flex-col items-center py-4 transition-all duration-300">
            <li className="w-full text-center">
              <Link
                to="./support"
                className="block py-2 text-black font-bold hover:text-blue-600"
                onClick={toggleMenu}
              >
                Health Support
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                to="./team"
                className="block py-2 text-black font-bold hover:text-blue-600"
                onClick={toggleMenu}
              >
                Our Team
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                to="./contact"
                className="block py-2 text-black font-bold hover:text-blue-600"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            {/* Toggle Button in Mobile Menu */}
            <li className="mt-2">
              <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                Join Us
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
