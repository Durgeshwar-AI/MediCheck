// src/Components/HospitalParts/HospitalSidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';

export default function HospitalSidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Appointments', icon: '📅' },
    { name: 'Patients', icon: '🧑‍🤝‍🧑' },
    { name: 'Doctors', icon: '👨‍⚕️' },
    { name: 'Facilities', icon: '🏥' },
    { name: 'Emergency', icon: '🚨' }
  ];

  return (
    <motion.div 
      className="w-64 bg-white shadow-md"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.li 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <a
                href="#"
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-100 text-blue-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </a>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.div>
  );
}