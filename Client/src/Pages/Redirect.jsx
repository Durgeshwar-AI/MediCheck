import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Redirect = () => {
  const navigate = useNavigate();

  const URL= import.meta.env.VITE_URL

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5
      }
    })
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-3xl text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-700"
        >
          Welcome to MediCare Portal
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {[
            { label: 'User Login/Register', path: `/register`, icon: '🧑‍⚕️' },
            { label: 'Hospital Login', path: `/hospitalLogin`, icon: '🏥' }
          ].map((role, i) => (
            <motion.div
              key={role.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="bg-white shadow-xl rounded-xl p-6 hover:shadow-2xl transition cursor-pointer"
              onClick={() => handleNavigation(role.path)}
            >
              <div className="text-5xl">{role.icon}</div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">{role.label}</h2>
              <p className="text-gray-500 mt-2">Click to continue as {role.label.includes('User') ? 'a user' : 'hospital staff'}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Redirect;
