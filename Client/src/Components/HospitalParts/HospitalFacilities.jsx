import React from 'react';
import { motion } from 'framer-motion';

const HospitalFacilities = ({ facilities }) => {
  const ProgressBar = ({ percent, color }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 md:h-3 mt-2">
      <motion.div
        className={`h-2.5 md:h-3 rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
      />
    </div>
  );

  return (
    <>
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-md h-full">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl text-center font-bold mb-1">
            Hospital Facilities
          </h2>
          <div className="w-32 md:w-45 h-0.5 bg-blue-500 mx-auto mb-7 rounded-full"></div>

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* General Ward */}
            <motion.div
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-blue-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-bold text-md md:text-lg">General Ward</h3>
              <p className="text-sm md:text-base">
                Available: {facilities.generalWard.available} beds
              </p>
              <p className="text-sm md:text-base">
                Occupied: {facilities.generalWard.occupied} beds
              </p>
              <ProgressBar percent={facilities.generalWard.percentFull} color="bg-blue-500" />
              <p className="text-right text-xs md:text-sm text-gray-500 mt-1">
                {facilities.generalWard.percentFull}% full
              </p>
            </motion.div>

            {/* ICU */}
            <motion.div
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-orange-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-bold text-md md:text-lg text-orange-600">ICU</h3>
              <p className="text-sm md:text-base">
                Available: {facilities.icu.available} beds
              </p>
              <p className="text-sm md:text-base">
                Occupied: {facilities.icu.occupied} beds
              </p>
              <ProgressBar percent={facilities.icu.percentFull} color="bg-orange-500" />
              <p className="text-right text-xs md:text-sm text-gray-500 mt-1">
                {facilities.icu.percentFull}% full
              </p>
            </motion.div>

            {/* Operating Rooms */}
            <motion.div
              className="bg-white p-3 md:p-4 rounded-lg shadow-sm border border-green-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-bold text-md md:text-lg">Operating Rooms</h3>
              <p className="text-sm md:text-base">
                Available: {facilities.operatingRooms.available} rooms
              </p>
              <p className="text-sm md:text-base">
                In Use: {facilities.operatingRooms.inUse} rooms
              </p>
              <ProgressBar percent={facilities.operatingRooms.percentInUse} color="bg-green-500" />
              <p className="text-right text-xs md:text-sm text-gray-500 mt-1">
                {facilities.operatingRooms.percentInUse}% in use
              </p>
            </motion.div>

            {/* Emergency */}
            <motion.div
              className="p-3 md:p-4 rounded-lg shadow-sm bg-red-50 border border-red-500"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="font-bold text-md md:text-lg text-red-700">Emergency</h3>
              <p className="text-sm md:text-base">
                On duty: {facilities.emergency.onDuty} doctors
              </p>
              <p className="text-sm md:text-base">
                Current cases: {facilities.emergency.currentCases}
              </p>
              <motion.button
                className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md w-full font-bold text-sm md:text-base"
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
};

export default HospitalFacilities;