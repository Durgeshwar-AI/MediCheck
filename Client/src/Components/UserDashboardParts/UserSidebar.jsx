import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const URL = import.meta.env.VITE_URL;

const UserSidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  // Debounced resize handler for responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setExpanded(!mobile); // Collapse sidebar on smaller screens
    };

    let resizeTimer;
    const handleResizeDebounced = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };

    window.addEventListener("resize", handleResizeDebounced);
    handleResize(); // Initialize state

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResizeDebounced);
    };
  }, []);

  // New navigation items based on your provided structure
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: `${URL}/dashboard` },
    { name: "Medical Records", icon: <FileText size={18} />, path: `${URL}/records` },
    { name: "Appointments", icon: <Calendar size={18} />, path: `${URL}/appointments` },
  ];

  return (
    <div className="flex h-screen sticky top-0 bg-gray-50">
      {/* Mobile overlay to close sidebar */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out sticky ${
          expanded ? "w-48" : "w-16"
        }`}
      >
        <nav className="p-3 mt-2">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const active = pathname === item.path;
              return (
                <li key={item.name} className="relative group">
                  <Link
                    to={item.path}
                    className={`flex items-center ${
                      expanded ? "justify-start" : "justify-center"
                    } px-3 py-3 rounded-lg transition-all ${
                      active
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-50 hover:text-blue-500"
                    }`}
                  >
                    <span className={`${active ? "text-blue-600" : "text-gray-500"}`}>
                      {item.icon}
                    </span>
                    {expanded && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
                    
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

        {/* Footer section */}
        <div className="absolute bottom-5 left-0 right-0 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-b-md">
          <div className="flex items-center justify-between">
            {/* User Profile */}
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                U
              </div>
              {expanded && (
                <div className="ml-3">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              )}
            </div>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="rounded-full hover:bg-blue-300 transition-colors"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <ChevronLeft color="green" size={22} />
              ) : (
                <ChevronRight color="red" size={25} />
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 transition-all duration-300 overflow-x-hidden">{children}</main>
    </div>
  );
};

export default UserSidebar;