import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div 
      className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-16 md:py-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <motion.div className="md:w-1/2 mb-12 md:mb-0" variants={containerVariants}>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight"
              variants={itemVariants}
            >
              Your Complete <span className="text-blue-600">Healthcare</span> Solution
            </motion.h1>
            
            <motion.p 
              className="text-lg text-gray-600 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Seamlessly connect your health devices, track vital data, and receive personalized healthcare recommendations all in one place.
            </motion.p>
            
            <motion.div className="flex space-x-4" variants={itemVariants}>
              <Link to="/register">
                <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all duration-300">
                  Get Started
                </button>
              </Link>
              <Link to="/home">
                <button className="px-8 py-3 border-2 border-blue-500 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right Image */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img 
              src={logo} 
              alt="MediCheck App" 
              className="w-[300px] md:w-[450px] object-contain filter drop-shadow-xl" 
            />
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="hidden md:block absolute -top-24 -right-24 w-96 h-96 bg-blue-100 rounded-full opacity-50"></div>
      <div className="hidden md:block absolute top-48 -left-12 w-48 h-48 bg-blue-100 rounded-full opacity-30"></div>
    </motion.div>
  );
};

export default Hero