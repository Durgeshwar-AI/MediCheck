// src/Components/HospitalParts/HospitalStatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HospitalStatsCard({ title, value, icon, bgColor }) {
  return (
    <motion.div 
      className={`${bgColor} rounded-lg p-6 shadow-sm`}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-700">{title}</h3>
          <motion.p 
            className="text-3xl font-bold mt-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {value}
          </motion.p>
        </div>
        <motion.div 
          className="text-2xl"
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