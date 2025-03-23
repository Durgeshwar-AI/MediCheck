import React, { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";


const URL = import.meta.env.VITE_URL;

const MENU_ITEMS = [
  { name: "home", path: `${URL}/home` },
  { name: "Health Support", path: `${URL}/support` },
  { name: "Our Team", path: `${URL}/team` },
  { name: "Contact Us", path: `${URL}/contact` },
];

const MenuItem = ({ item, isActive, isMobile, onClick }) => (
  <motion.li
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Link
      to={item.path}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={`group p-1.5 font-bold rounded-xl transform transition-transform duration-300 ${
        isMobile
          ? "block mx-1.5 py-1 hover:bg-gray-100 w-full text-center"
          : "hover:text-blue-600 hover:bg-gray-100"
      } ${isActive ? "text-blue-600" : "text-black"} relative overflow-hidden`}
    >
      {item.name}
      <span
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform transition-transform duration-300 ease-in-out delay-100 ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </Link>
  </motion.li>
);

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  }).isRequired,
  isActive: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func,
};
MenuItem.defaultProps = { isMobile: false, onClick: null };

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(
    () => menuOpen && setMenuOpen(false),
    [menuOpen]
  );
  const isActive = useCallback((path) => pathname === path, [pathname]);

  const JoinButton = ({ mobile }) => (
    <motion.button
      className={`px-4 py-2 ${
        mobile ? "bg-white" : "bg-gray-50"
      } font-bold rounded-xl cursor-pointer border-2 border-orange-300 text-orange-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:border-white hover:border-double focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        !mobile && "focus:ring-opacity-50"
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      onClick={mobile ? closeMenu : undefined}
      aria-label="Join us"
    >
      Join Us
    </motion.button>
  );
  JoinButton.propTypes = { mobile: PropTypes.bool };
  JoinButton.defaultProps = { mobile: false };

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-2"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <Link
          to="/home"
          className="flex items-center cursor-pointer"
          aria-label="MediCheck Home"
        >
          <motion.img
            src={logo}
            alt=""
            className="rounded-b-full h-10 w-10 m-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <h1 className="text-blue-700 font-bold italic [text-shadow:_0_4px_5px_rgb(205_194_194/_0.5)] block text-2xl my-1">
            MediCheck
          </h1>
        </Link>
      </div>
      <nav
        className="hidden md:flex flex-grow justify-end"
        aria-label="Main navigation"
      >
        <ul className="flex space-x-6">
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.path}
              item={item}
              isActive={isActive(item.path)}
            />
          ))}
        </ul>
      </nav>
      <div className="hidden md:block ml-4">
        <JoinButton />
      </div>
      <button
        className="md:hidden ml-auto z-20 p-2"
        onClick={toggleMenu}
        aria-expanded={menuOpen}
        aria-label="Toggle menu"
        aria-controls="mobile-menu"
      >
        <div className="flex flex-col justify-between w-6 h-5">
          <motion.span
            className="block h-0.5 bg-black origin-center"
            animate={menuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 bg-black"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 bg-black origin-center"
            animate={menuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className="absolute top-full left-0 w-full bg-gray-100/97 shadow-lg md:hidden z-20"
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.ul className="flex flex-col items-center py-2 space-y-1">
              {MENU_ITEMS.map((item) => (
                <MenuItem
                  key={item.path}
                  item={item}
                  isActive={isActive(item.path)}
                  isMobile
                  onClick={closeMenu}
                />
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-2 w-full flex justify-center"
              >
                <motion.button
                  className="px-4 py-2 bg-white font-bold rounded-xl cursor-pointer border-2 border-orange-300 text-orange-300 hover:scale-105 hover:bg-blue-500 hover:text-white hover:font-bold hover:border-white hover:border-double focus:outline-none focus:ring-2 focus:ring-blue-500"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  onClick={closeMenu}
                >
                  Join Us
                </motion.button>
              </motion.li>
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
