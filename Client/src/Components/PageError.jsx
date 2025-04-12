import React from "react";
import { motion } from "framer-motion";

const PageError = () => {
  const pulseDuration = 0.833;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      {/* Container with card effect */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg max-w-md w-full mx-4 border border-gray-200">
        {/* 404 with heart animation */}
        <div className="relative flex justify-center items-center mb-6">
          {/* Background pulse effect */}
          <motion.div
            className="absolute rounded-full h-28 w-28 md:h-32 md:w-32 bg-red-100 opacity-60"
            animate={{
              scale: [0.95, 1.15, 0.95],
              opacity: [0.8, 0.4, 0.8],
            }}
            transition={{
              duration: pulseDuration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          />

          {/* 404 + Heart Icon */}
          <div className="flex items-center justify-center">
            {/* Left "4" */}
            <motion.div
              className="text-4xl md:text-5xl font-bold text-gray-800 mr-2"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{
                duration: pulseDuration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: pulseDuration * 0.25,
              }}
            >
              4
            </motion.div>

            {/* Heart Icon */}
            <motion.div
              className="relative flex items-center justify-center mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: pulseDuration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            >
              <svg width="60" height="60" viewBox="0 0 128 128" className="fill-current text-red-500">
                <path d="M93.99 8.97c-21.91 0-29.96 22.39-29.96 22.39s-7.94-22.39-30-22.39c-16.58 0-35.48 13.14-28.5 43.01c6.98 29.87 58.56 67.08 58.56 67.08s51.39-37.21 58.38-67.08c6.98-29.87-10.56-43.01-28.48-43.01z"/>
              </svg>
            </motion.div>

            {/* Right "4" */}
            <motion.div
              className="text-4xl md:text-5xl font-bold text-gray-800 ml-2"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{
                duration: pulseDuration,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: pulseDuration * 0.5,
              }}
            >
              4
            </motion.div>
          </div>
        </div>

        {/* Error Message */}
        <div className="text-center">
          <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">Oops! The page you're looking for doesn't exist.</p>

          {/* Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            className="px-5 py-2 bg-blue-600 text-white rounded-md shadow-md text-sm md:text-base"
            whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Go Back
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-gray-500 text-xs md:text-sm">
        <p>
          Try searching or navigate to{" "}
          <motion.a href="/" className="text-blue-600" whileHover={{ textDecoration: "underline" }}>
            homepage
          </motion.a>
        </p>
      </div>
    </div>
  );
};

export default PageError;