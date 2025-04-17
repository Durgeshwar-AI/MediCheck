import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import UserAiBot from './UserAiBot';

const UserAiSection = () => {
  const [showAI, setShowAI] = useState(false);
  
  const handleAIBtn = () => {
    setShowAI(!showAI);
  };
  
  return (
    <div className="flex flex-col items-center justify-center shadow-md rounded-2xl bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
      <motion.button
        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-2xl text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mb-8"
        onClick={handleAIBtn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
        {showAI ? 'Close Medical Assistant' : 'Open Medical Assistant'}
      </motion.button>

      <AnimatePresence>
        {showAI && <UserAiBot />}
      </AnimatePresence>
    </div>
  );
};

export default UserAiSection;