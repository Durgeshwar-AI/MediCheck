import React, { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";
import { isLoggedIn, removeToken } from "../utils/auth";

const URL = import.meta.env.VITE_URL;

const MENU_ITEMS = [
  { name: "Home", path: `${URL}/home` },
  { name: "Health Support", path: `${URL}/support` },
  { name: "Our Team", path: `${URL}/team` },
  { name: "Contact Us", path: `${URL}/contact` },
];

const Navbar = ({ join }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => menuOpen && setMenuOpen(false), [menuOpen]);
  const isActive = useCallback((path) => pathname === path, [pathname]);

  // Check authentication status when component mounts or join prop changes
  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, [join, pathname]);

  // Handle logout
  const handleLogout = () => {
    removeToken();
    setUserLoggedIn(false);
    navigate("/");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-2"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <Link to="/" className="flex items-center cursor-pointer" aria-label="MediCheck Home">
          <motion.img
            src={logo}
            alt=""
            className="rounded-b-full h-10 w-10 m-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <h1 className="text-blue-700 font-bold italic text-2xl my-1">MediCheck</h1>
        </Link>
      </div>
      <nav className="hidden md:flex flex-grow justify-end" aria-label="Main navigation">
        <ul className="flex space-x-6">
          {MENU_ITEMS.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`group p-1.5 font-bold rounded-xl transform transition-transform duration-300 ${
                  isActive(item.path) ? "text-blue-600" : "text-black"
                } hover:text-blue-600 hover:bg-gray-100`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="hidden md:block ml-4">
        {join && !userLoggedIn ? (
          <a href={`${URL}/register`} className="px-4 py-2 font-bold rounded-xl cursor-pointer border-2 border-orange-300 text-orange-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:border-white hover:border-double bg-white border-double">
            Join Us
          </a>
        ) : join && userLoggedIn ? (
          <button 
            onClick={handleLogout}
            className="px-4 py-2 font-bold rounded-xl cursor-pointer border-2 border-red-300 text-red-500 hover:scale-105 hover:bg-red-500 hover:text-white hover:border-white transition duration-300"
          >
            Logout
          </button>
        ) : null}
      </div>
      <button className="md:hidden ml-auto z-20 p-2" onClick={toggleMenu} aria-expanded={menuOpen}>
        <div className="flex flex-col justify-between w-6 h-5 cursor-pointer">
          <motion.span className="block h-0.5 bg-black" animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }} />
          <motion.span className="block h-0.5 bg-black" animate={{ opacity: menuOpen ? 0 : 1 }} />
          <motion.span className="block h-0.5 bg-black" animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }} />
        </div>
        <motion.span
         className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" animate={{ opacity: menuOpen ? 1 : 0 }}
       ></motion.span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-20" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <motion.ul className="flex flex-col items-center py-2 space-y-1">
              {MENU_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={closeMenu}
                    className={`block px-5 py-2 w-fit text-center font-bold ${
                      isActive(item.path) ? "text-blue-600" : "text-black"
                    } hover:text-blue-600 hover:bg-gradient-to-b from-gray-50 to-gray-100 hover:rounded-xl hover:scale-105`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {join && !userLoggedIn ? (
                <li className="mt-2 w-full flex justify-center">
                  <a href={`${URL}/register`} className="px-4 py-1 bg-white font-bold rounded-xl border-double border-2 border-orange-300 text-orange-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:border-white">
                    Join Us
                  </a>
                </li>
              ) : join && userLoggedIn ? (
                <li className="mt-2 w-full flex justify-center">
                  <button 
                    onClick={handleLogout}
                    className="px-4 py-1 bg-white font-bold rounded-xl border-double border-2 border-red-300 text-red-500 hover:scale-105 hover:bg-red-500 hover:text-white hover:border-white transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              ) : null}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;