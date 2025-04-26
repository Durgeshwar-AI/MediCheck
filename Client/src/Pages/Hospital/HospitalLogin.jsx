import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import { ArrowLeftFromLine } from "lucide-react";
import { storeToken, isLoggedIn } from "../../utils/auth";
import { useHealth } from "../../hooks/useHealth";

const HospitalLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { updateLogin, updateType } = useHealth();
  const URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      updateLogin(true);
      const tokenData = localStorage.getItem("authToken");
      const { type } = JSON.parse(tokenData);
      updateType(type);
      navigate("/home");
    }
  }, [navigate, updateLogin]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/hospital/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        storeToken(
          data.token,
          data.firstname,
          data.email,
          data.type,
          data.company
        );
        updateLogin(true);
        updateType(data.type);
        navigate("/hospitalDashboard");
      } else {
        alert("❌ Login failed!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <Link
            to="/"
            className="flex items-center cursor-pointer"
            aria-label="MediCheck Home"
          >
            <motion.img
              src={logo}
              alt="logo"
              className="rounded-b-full h-10 w-10 m-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            />
            <h1 className="text-blue-700 font-bold italic text-2xl my-1">
              MediCheck
            </h1>
          </Link>
        </div>
        {/* <div className="hidden md:flex flex-grow justify-end"></div> */}
      </motion.header>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full max-w-md bg-white rounded-xl shadow-xl p-8"
        >
          <motion.button
            type="button"
            aria-label="Go back to previous page"
            onClick={handleGoBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{
              scale: 0.95,
              x: -220, // Move left when clicked
              transition: { duration: 1 }, // Add a transition for the rotation
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 flex items-center"
            aria-describedby="go-back-tooltip"
          >
            <ArrowLeftFromLine />
          </motion.button>

          <div className="mb-6 text-center">
            <h2 className="text-3xl font-extrabold text-blue-700">
              🏥 MediCare Hospital
            </h2>
            <p className="text-gray-500 mt-2">Login to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute top-2 right-3 text-gray-500 text-2xl font-bold rounded"
              >
                {showPassword ? <RxEyeOpen /> : <LuEyeClosed />}
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-500">
            Forgot your password?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Reset it
            </span>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default HospitalLogin;
