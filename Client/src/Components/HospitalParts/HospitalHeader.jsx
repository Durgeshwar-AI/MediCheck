// src/Components/HospitalParts/HospitalHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import logo from "../../assets/logo.png";
import { GrSearchAdvanced } from "react-icons/gr";
import { FaUserMd } from "react-icons/fa";

export default function HospitalHeader() {
  return (
    <motion.header
      className="bg-blue-600 text-white p-4 shadow-md sticky top-0 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Title */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <motion.img
            src={logo}
            alt="MediCheck Logo"
            className="invert rounded-b-full ml-2 h-16 w-16"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <h1 className="text-2xl font-bold">MediCheck Hospital Dashboard</h1>
        </div>

        {/* Right Section: Search and User Profile */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search patients, doctors, rooms..."
              className="py-2 px-4 md:w-150 w-120 h-10 md:h-12 pr-10 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
            />
            <button className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-400 transition duration-200 cursor-pointer">
              <GrSearchAdvanced size={28} />
            </button>
          </div>
          {/* User Profile */}
          <div className="flex items-center space-x-2 bg-yellow-300 text-teal-700 px-3 py-2 rounded-full cursor-pointer hover:bg-yellow-400 transition duration-200">
            <FaUserMd size={22} />
            <span className="text-sm font-bold text-gray-700">Dr. Smith</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}