// src/Components/HospitalParts/HospitalHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HospitalHeader() {
  return (
    <motion.header 
      className="bg-blue-600 text-white p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">MediCheck Hospital Dashboard</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search patients, doctors, rooms..."
              className="py-2 px-4 pr-10 rounded-full w-64 text-gray-800 focus:outline-none"
            />
            <button className="absolute right-3 top-2.5 text-gray-500">
              🔍
            </button>
          </div>
          
          <div className="w-8 h-8 bg-yellow-200 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <span className="bg-blue-200 text-blue-800 p-1 rounded-full">💡</span>
            <span className="font-medium">Dr. Smith</span>
          </div>
        </div>
      </div>
    </motion.header>
  );
}