import React from 'react';
import { motion } from 'framer-motion';

const HospitalStatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <motion.div
      className={`${bgColor} rounded-lg p-4 sm:p-6 shadow-sm w-full`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-700 truncate">{title}</h3>
          <motion.p
            className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div
          className="text-xl sm:text-2xl flex-shrink-0 ml-2"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
}
export default HospitalStatsCard;