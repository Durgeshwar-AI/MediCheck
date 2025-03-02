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
    <header className="relative flex items-center justify-between px-4 py-2 bg-white shadow-md ">
      {/* Logo */}
      <div>
        <Link to="/home" className="flex items-center cursor-pointer">
          <img
            src= {logo} // Add your logo here
            alt="Logo"
            className="rounded-b-full h-10 w-10 m-2" // Adjust the width and height of the logo
          />
          <h1 className="text-blue-700 font-bold italic [text-shadow:_0_4px_5px_rgb(205_194_194/_0.5)] block text-2xl my-1">
            MediCheck
          </h1>
        </Link>
      </div>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:flex flex-grow justify-end">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/support"
              className="group p-1.5 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-xl transform transition-transform duration-300 hover:scale-105 relative overflow-hidden"
            >
              Health Support

              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/team"
              className="group p-1.5 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-xl transform transition-transform duration-300 hover:scale-105 relative overflow-hidden"
            >
              Our Team

              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="group p-1.5 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-xl transform transition-transform duration-300 hover:scale-105 relative overflow-hidden"
            >
              Contact us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
            </Link>
          </li>

        </ul>
      </nav>

      <div className="join-btn hidden md:block ml-4">
        <button className="px-3 py-1 bg-gray-50 font-bold rounded-xl cursor-pointer transform transition-transform duration-500 
              border-2 
              border-orange-300 text-orange-300 
              hover:scale-105 hover:bg-blue-500 hover:text-white hover:font-bold hover:border-white hover:border-double">
          Join Us
        </button>
      </div>

      {/* Mobile Menu Button */}
      <div className="menu-btn md:hidden ml-auto z-20" onClick={toggleMenu}>
        <div className="flex flex-col justify-between w-6 h-5 cursor-pointer">
          <span
            className={`block h-0.5 bg-black transition-transform duration-300 ${menuOpen ? "transform rotate-45 translate-y-3 p-[1.5px] w-7 bg-neutral-800" : ""
              }`}
          ></span>
          <span
            className={`block h-0.5 bg-black transition-opacity duration-100 ${menuOpen ? "opacity-0" : ""
              }`}
          ></span>
          <span
            className={`block h-0.5 bg-black transition-transform duration-300 ${menuOpen ? "transform -rotate-45 -translate-y-1 p-[1.5px] w-7 bg-neutral-800" : ""
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
                to="/support"
                className="block mx-1.5 py-2 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-2xl transform transition-transform duration-300 hover:scale-105"
                onClick={toggleMenu}
              >
                Health Support
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                to="/team"
                className="block mx-1.5 py-2 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-2xl transform transition-transform duration-300 hover:scale-105"
                onClick={toggleMenu}
              >
                Our Team
              </Link>
            </li>
            <li className="w-full text-center">
              <Link
                to="/contact"
                className="block mx-1.5 py-2 text-black font-bold hover:text-blue-600 hover:bg-gray-100 rounded-2xl transform transition-transform duration-300 hover:scale-105"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            {/* Toggle Button in Mobile Menu */}
            <li className="mt-2">
              <button className="px-3 py-1 bg-gray-50 font-bold rounded-xl cursor-pointer transform transition-transform duration-500 
              border-2 
              border-orange-300 text-orange-300 
              hover:scale-105 hover:bg-blue-500 hover:text-white hover:font-bold hover:border-white hover:border-double [text-shadow:_1px_1px_2px_rgb(205_194_194/_0.5)]" >
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
