import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/auth';

const LogoutButton = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Remove the token
    removeToken();
    
    // Redirect to landing page
    navigate('/');
  };
  
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 font-bold rounded-xl cursor-pointer border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogoutButton;