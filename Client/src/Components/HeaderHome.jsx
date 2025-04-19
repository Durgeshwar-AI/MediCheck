import React from "react";
import { useHealth } from "../hooks/useHealth";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

function HeaderHome() {
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);

  const { deviceConnected } = useHealth();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">Hello {userName}</h1>
          <p className="mt-2 italic text-gray-600">
            Keep your daily health under control
          </p>
          <div className="mt-4 flex space-x-4">
            {deviceConnected ? (
              ""
            ) : (
              <button className="bg-white border-2 hover:font-bold border-blue-600 text-blue-600 px-4 py-2 rounded-md shadow:md hover:border-white hover:text-white hover:bg-blue-400">
                Connect Device
              </button>
            )}
          </div>
        </div>

        <Link to='/dashboard'>
          <motion.button
            className="bg-white text-blue-600 border-2 hover:border-white hover:text-white hover:bg-blue-400 border-blue-300 shadow-lg py-2 px-4 mt-5 rounded-full flex items-center md:justify-center justify-end"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
            aria-label="View Full Dashboard"
          >
            <span className="md:block hidden">View Full </span> Dashboard
          </motion.button>
        </Link>
      </div>
    </div>
  );
}

export default HeaderHome;
