import React from 'react';
import { motion } from 'framer-motion';

const HospitalStatsCard = ({ title, value, icon, bgColor }) => {
  return (
    <motion.div
      className={`${bgColor || 'bg-white'} rounded-lg p-2 sm:p-4 shadow-md w-full h-40 flex flex-col justify-around cursor-pointer`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label={`${title}: ${value}`}
    >
      <div className="w-full">
        <h3 className="text-sm sm:text-base md:text-xl font-medium text-gray-700 truncate ">
          {title}
        </h3>
      <hr className='mt-2' />
      </div>
      
      <div className="flex justify-between items-center w-full">
        <motion.p
          className=" text-xl md:text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {value}
        </motion.p>
        
        <motion.div
          className="text-2xl md:text-3xl text-gray-600"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HospitalStatsCard;