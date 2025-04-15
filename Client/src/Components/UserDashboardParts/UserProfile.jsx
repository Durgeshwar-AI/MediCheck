import React, { useState } from "react";
import { User } from "lucide-react";

const UserProfile = () => {
  // State to manage user data
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Passionate about health and well-being!",
    avatar: "", // Initially empty to demonstrate fallback
  });

  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="w-80 p-4 bg-white border rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {/* Use the avatar if set, otherwise default to User icon */}
        {userData.avatar ? (
          <img className="w-16 h-16 rounded-full bg-amber-200" src={userData.avatar} alt="Profile" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center">
            <User size={32} className="text-blue-700" />
          </div>
        )}
        <div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-2">
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded-md"
          />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded-md"
          />
          <textarea
            name="bio"
            value={userData.bio}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded-md"
          />
          <button onClick={toggleEdit} className="w-full bg-blue-500 text-white py-1 rounded-md">
            Save
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-gray-700">{userData.bio}</p>
          <button
            onClick={toggleEdit}
            className="mt-2 mx-auto bg-blue-500 text-white px-4 py-1 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;