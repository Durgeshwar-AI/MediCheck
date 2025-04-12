// src/Components/HospitalParts/HospitalFacilities.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HospitalFacilities({ facilities }) {
  const ProgressBar = ({ percent, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
      <motion.div 
        className={`h-2.5 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );

  return (
    <>
    <div className="bg-white p-6 rounded-lg shadow-md h-full">
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl text-center font-bold mb-1">Hospital Facilities</h2>
      <div className="w-45 h-0.5 bg-blue-500 mx-auto mb-7 rounded-full"></div>
      
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm border border-blue-500"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold">General Ward</h3>
          <p>Available: {facilities.generalWard.available} beds</p>
          <p>Occupied: {facilities.generalWard.occupied} beds</p>
          <ProgressBar percent={facilities.generalWard.percentFull} color="bg-blue-500" />
          <p className="text-right text-sm text-gray-500 mt-1">{facilities.generalWard.percentFull}% full</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm border border-orange-500"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold text-orange-600">ICU</h3>
          <p>Available: {facilities.icu.available} beds</p>
          <p>Occupied: {facilities.icu.occupied} beds</p>
          <ProgressBar percent={facilities.icu.percentFull} color="bg-red-500" />
          <p className="text-right text-sm text-gray-500 mt-1">{facilities.icu.percentFull}% full</p>
        </motion.div>
        
        <motion.div 
          className="bg-white p-4 rounded-lg shadow-sm border border-green-500"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold">Operating Rooms</h3>
          <p>Available: {facilities.operatingRooms.available} rooms</p>
          <p>In Use: {facilities.operatingRooms.inUse} rooms</p>
          <ProgressBar percent={facilities.operatingRooms.percentInUse} color="bg-green-500" />
          <p className="text-right text-sm text-gray-500 mt-1">{facilities.operatingRooms.percentInUse}% in use</p>
        </motion.div>
        
        <motion.div 
          className=" p-4 rounded-lg shadow-sm bg-red-50 border border-red-500"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3 className="font-bold text-red-700">Emergency</h3>
          <p>On duty: {facilities.emergency.onDuty} doctors</p>
          <p>Current cases: {facilities.emergency.currentCases}</p>
          <motion.button 
            className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md w-full font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ALERT TEAM
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
    </div>
    </>
  );
}