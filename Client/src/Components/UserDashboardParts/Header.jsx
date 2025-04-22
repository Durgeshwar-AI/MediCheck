import React, { useState } from "react";
import { User } from "lucide-react";
import UserProfile from "../../Components/UserDashboardParts/UserProfile";
import logo from "../../assets/logo.png";
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";


function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to={`/home`}>
        <div className="flex flex-row">
          <motion.img
            src={logo}
            alt="logo"
            className="rounded-b-full h-10 w-10 m-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
            <div className="text-blue-600 font-bold text-2xl mr-2 my-auto">
              <span className="font-black">Medi</span>Check
            </div>
          </div>
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {/* popup for UserProfile.jsx */}
          <UserProfileLogo />
        </div>
      </div>
    </header>
  );
}



// function NotificationBell() {
//   const [count, setCount] = useState(2);

//   return (
//     <button className="relative p-2 rounded-full hover:bg-gray-100">
//       <Bell size={20} />
//       {count > 0 && (
//         <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//           {count}
//         </span>
//       )}
//     </button>
//   );
// }

function UserProfileLogo() {
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile((prev) => !prev); // Correct syntax for toggling state
  };

  return (
    <div className="relative"> {/* Wrap with div to allow relative positioning */}
      <button
        className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100"
        onClick={toggleProfile}
      >
        <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center">
          <User size={20} className="text-blue-700" />
        </div>
      </button>
      {showProfile && (
        <div className="absolute right-0 mt-2 w-fit p-4 z-10">
          <UserProfile /> {/* Popup content for the user profile */}
        </div>
      )}
    </div>
  );
}

export default Header;
