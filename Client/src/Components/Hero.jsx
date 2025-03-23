import React from 'react';
import logo from '../assets/logo.png'; // Ensure the path is correct
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
  // Animation Variants
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.3 } },
  };

  const buttonVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.8, delay: 0.6 } },
    
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, delay: 0.5 } },
  };

  return (
    <div className="hero-container p-4 grid grid-cols-1 md:grid-cols-2 items-center mt-[-20px]">
      <div className="hero-content">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl font-bold p-1.5 mb-6"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
        >
          Find the best solution together.
        </motion.h1>

        {/* Animated Paragraph */}
        <motion.span
          className="m-1 p-1.5 bg-clip-text text-xl text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          variants={paragraphVariants}
          initial="hidden"
          animate="visible"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla provident commodi, non,
          deserunt unde veritatis ullam autem magni esse maiores nam odit! Magnam, suscipit numquam?
        </motion.span>

        {/* Animated Button */}
        <motion.div
          className="mt-6 flex md:justify-start md:ml-2.5 justify-center"
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <Link to="/home">
            <button className="text-xl text-blue-600 px-10 py-1 border-blue-600 border-double border-2 hover:border hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white pb-2 rounded-full font-semibold hover:scale-105 transition-all duration-500 shadow-cyan-200 shadow-[_3px_3px_5px_rgb(205_194_194/_0.5)]">
              Get Started
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Animated Image with One-Time Fade-In */}
      <motion.div
        className="hero-image rounded-full flex justify-center items-center"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <img src={logo} alt="MediCheck Logo" className="w-[400px] lg:w-[500px]" />
      </motion.div>
    </div>
  );
};

export default Hero;
