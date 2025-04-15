import React, { useState } from "react";
import { Home, FileText, Calendar, MessageSquare, User } from "lucide-react";
import UserProfile from "../../Components/UserDashboardParts/UserProfile";


function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b shadow-sm px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-blue-600 font-bold text-2xl mr-2">
            <span className="font-black">Medi</span>Check
          </div>
          <MainNav />
        </div>
        <div className="flex items-center space-x-3">
          {/* popup for UserProfile.jsx */}
          <UserProfileLogo />
        </div>
      </div>
    </header>
  );
}

function MainNav() {
  const [active, setActive] = useState("Dashboard");
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} /> },
    { name: "Medical Records", icon: <FileText size={18} /> },
    { name: "Appointments", icon: <Calendar size={18} /> },
    { name: "Messages", icon: <MessageSquare size={18} /> }
  ];

  return (
    <nav className="hidden md:flex ml-8">
      {navItems.map((item) => (
        <button
          key={item.name}
          className={`flex items-center px-4 py-2 mx-1 rounded-md transition-colors ${active === item.name
            ? "bg-blue-100 text-blue-700"
            : "hover:bg-gray-100"
            }`}
          onClick={() => setActive(item.name)}
        >
          <span className="mr-2">{item.icon}</span>
          {item.name}
        </button>
      ))}
    </nav>
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
