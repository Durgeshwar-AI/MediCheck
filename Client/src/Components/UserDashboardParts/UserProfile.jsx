import React, { useState } from "react";
import { User, Settings } from "lucide-react";
import LogoutButton from "../LogoutButton";
// import { useHealth } from "../../hooks/useHealth";


const UserProfile = () => {
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);

  const [userData, setUserData] = useState({
    email: "patient@example.com",
    bio: "Passionate about health and well-being!",
    avatar: "",
  });

  return (
    <div className="w-[360px] p-4 bg-white border rounded-xl shadow-md relative flex flex-col items-center z-30">
      {/* Settings button positioned at the top-right */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
        <Settings size={20} />
      </button>

      {/* Flex container for avatar and user details */}
      <div className="flex items-center w-full space-x-4">
        {/* Avatar section */}
        <div>
          {userData.avatar ? (
            <img className="w-18 h-18 rounded-full object-cover border-2 border-blue-200" src={userData.avatar} alt="Profile" />
          ) : (
            <div className="w-18 h-18 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
              <User size={40} className="text-blue-600" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
          <p className="text-gray-600 text-sm">{userData.email}</p>
        </div>
      </div>

      {/* Bio section */}
      <div className=" w-full ml-10">
        <h3 className="text-sm font-semibold text-gray-500">About</h3>
        <p className="text-gray-700 italic">{userData.bio}</p>
      </div>
      <div className="">
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfile;