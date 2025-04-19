import React from "react";
import Hero from "../Components/LandingParts/Hero";
import Footer from "../Components/Footer";
import About from "../Components/LandingParts/About";
import Services from "../Components/LandingParts/Services";
import ConnectSmart from "../Components/LandingParts/ConnectSmart";
import Features from "../Components/LandingParts/Features";
import DownloadApp from "../Components/LandingParts/DownloadApp";
import LogoutButton from "../Components/LogoutButton"
import { motion } from "framer-motion";
import {useHealth} from "../hooks/useHealth"

const Landing = () => {

  const {userLoggedIn} = useHealth()

  console.log(userLoggedIn)

  const URL= import.meta.env.VITE_URL || window.location.origin
  const navItems = [{name:'Home', path: `${URL}/home`}, {name: 'Emergency', path: `${URL}/support`}, {name:'About', path: `${URL}/about`}, {name:'Contact', path:`${URL}/contact`}];

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 shadow-md px-6 py-3 flex justify-between items-center"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
        >
          Medicheck
        </motion.div>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, color: "#4F46E5" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="cursor-pointer transition-colors"
            >
              <a href={item.path}>{item.name}</a>
            </motion.li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="flex gap-3">
        {userLoggedIn?<LogoutButton/>:(<a href={`${URL}/redirect`}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          >
            Login
          </motion.button>
          </a>)}
        </div>
      </motion.nav>
      <div className="w-screen-lg mx-auto">
        <Hero />
        <About />
        <Services />
        <ConnectSmart />
        <Features />
        <DownloadApp />
      </div>
      <Footer />
    </>
  );
};

export default Landing;
