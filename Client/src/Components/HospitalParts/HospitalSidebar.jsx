import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  UserPlus,
  Building,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  LogOut
} from "lucide-react";

const HospitalSidebar = ({ children }) => {
  const tokenData = localStorage.getItem("authToken");
  const { company } = JSON.parse(tokenData);

  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const maxLength = 7; 
  const userName = company

  const getInitials = (name) => {
    const words = name.split(" ");
    const initials = words
      .map((word) =>
        word.toLowerCase() === "dr." ? "Dr." : word.charAt(0).toUpperCase()
      )
      .join("");
    return initials.length > maxLength
      ? initials.substring(0, maxLength) + "..."
      : initials;
  };

  const displayName = getInitials(userName);

  // Logout function: clear the token and navigate to /login
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Prevent SSR errors & optimize resize handling with debounce
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setExpanded(!mobile); // Collapse on smaller screens
    };

    const debounceResize = () => setTimeout(handleResize, 200);
    window.addEventListener("resize", debounceResize);

    handleResize(); // Initialize correct sidebar state

    return () => window.removeEventListener("resize", debounceResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/hospitalDashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Appointments", path: "/hospitalAppointments", icon: <Calendar size={20} /> },
    { name: "Patients", path: "/hospitalPatients", icon: <Users size={20} /> },
    { name: "Doctors", path: "/hospitalDoctors", icon: <UserPlus size={20} /> },
    { name: "Facilities", path: "/hospitalFacilities", icon: <Building size={20} /> },
    { name: "Emergency", path: "/hospitalEmergency", icon: <AlertTriangle size={20} /> },
  ];

  return (
    <div className="flex h-screen sticky top-0 bg-gray-50">
      {/* Mobile overlay for closing menu */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out sticky ${
          expanded ? "w-48" : "w-16"
        }`}
      >
        {/* Navigation menu */}
        <nav className="p-3 mt-2">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const active = pathname === item.path;
              return (
                <li
                  key={item.name}
                  className="relative group hover:font-bold hover:text-blue-500"
                >
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      expanded ? "justify-start" : "justify-center"
                    } px-3 py-3 rounded-lg transition-all ${
                      active
                        ? "bg-blue-50 text-red-600 font-medium"
                        : "text-gray-600 hover:font-bold hover:text-blue-500 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`${
                        active ? "text-red-600" : "text-gray-500 hover:font-bold hover:text-blue-500"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {expanded && (
                      <span className="ml-3 whitespace-nowrap">
                        {item.name}
                      </span>
                    )}

                    {/* Tooltip for collapsed menu */}
                    {!expanded && (
                      <div className="absolute left-14 z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                        {item.name}
                      </div>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer section with user profile, toggle button, and logout */}
        <div className="absolute bottom-5 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-b-md">
          <div className="flex items-center justify-between">
            {/* User Profile */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                U
              </div>
              {expanded && (
                <div className="ml-3">
                  <p className="text-sm font-medium">{displayName}</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              )}
            </div>

            {/* Toggle sidebar button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full hover:bg-blue-300 transition-colors hover:font-bold"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <ChevronLeft color="green" size={22} />
              ) : (
                <ChevronRight color="red" size={25} />
              )}
            </button>
          </div>
           {/* Logout section:  */}
           {expanded && (
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center justify-start w-full px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white text-red-600 transition-all "
              aria-label="Logout"
            >
              <LogOut size={20} />
              <span className="ml-3">Log Out</span>
            </button>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 transition-all duration-300 overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default HospitalSidebar;