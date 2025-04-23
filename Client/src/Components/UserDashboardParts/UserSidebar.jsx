import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, FileText, Calendar, ChevronLeft, ChevronRight, User, BrainCog, LogOut, AlertTriangle } from "lucide-react";

const UserSidebar = ({ children }) => {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);


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

  // New navigation items
  const navItems = [
    { name: "Dashboard", icon: <Home size={18} />, path: `/dashboard` },
    { name: "Medical Records", icon: <FileText size={18} />, path: `/records` },
    { name: "Appointments", icon: <Calendar size={18} />, path: `/appointments` },
    { name: "Emergency", path: "/support", icon: <AlertTriangle size={20} /> },
    { name: "Ask AI", path: "/ai", icon: <BrainCog size={20} /> },

  ];

  // Logout function: clear token and reload to login
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = `/`;
  };

  return (
    <div className="flex h-screen sticky top-0 bg-gray-50">
      {/* Mobile overlay to close sidebar */}
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md z-20"
          aria-hidden="true"
          onClick={() => setExpanded(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`h-full z-50 bg-white shadow-lg transition-all duration-300 ease-in-out sticky ${expanded ? "w-48" : "w-12"
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
                    className={`flex items-center ${expanded ? "justify-start" : "justify-center"} px-3 py-3 rounded-lg transition-all  ${
                      active
                        ? "bg-blue-50 text-red-600 font-medium"
                        : "text-gray-600 hover:font-bold hover:text-blue-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className={`${
                        active ? "text-red-600" : "text-gray-500 hover:font-bold hover:text-blue-500"
                      }`}>
                      {item.icon}
                    </span>
                    {expanded && <span className="ml-3 whitespace-nowrap">{item.name}</span>}
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

        {/* Footer section with user profile and logout */}
        <div className="absolute bottom-5 -left-1 right-0 p-4 border-t border-gray-100 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 rounded-b-md">
          <div className="flex items-center justify-between">
            {/* User Profile */}
            <div className="flex items-center">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={18} />
              </div>
              {expanded && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{userName}</p>
                  <p className="text-xs text-gray-500">patient@example.com</p>
                </div>
              )}
            </div>

            {/* Toggle sidebar button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? (
                <ChevronLeft size={16} className="text-red-600 bg-blue-300 border border-red-700-500 rounded-full" />
              ) : (
                <ChevronRight size={16} className="text-blue-600 bg-red-300 border border-blue-700 rounded-full" />
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
      </aside>

      {/* Main content area */}
      <main className="flex-1 transition-all duration-300 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default UserSidebar;