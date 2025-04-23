import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import { ArrowLeftFromLine } from "lucide-react";
import { storeToken, isLoggedIn } from "../../utils/auth";
import { useHealth } from "../../hooks/useHealth";

const URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { updateLogin, updateType } = useHealth();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      updateLogin(true);
      const tokenData = localStorage.getItem("authToken");
      const { type } = JSON.parse(tokenData);
      updateType(type);
      navigate("/home");
    }
  }, [navigate, updateLogin]);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        storeToken(data.token, data.firstname,data.email, data.type,data.company);
        setMessage("✅ Login successful!");
        updateLogin(true);
        updateType(data.type);
        // redirect logic here if needed
        navigate("/home");
        // Redirect after 2 seconds
      } else {
        setMessage(data.message || "❌ Login failed!");
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
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
      <div className="bg-blue-50 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
          {/* Add cancel/go back button to top right of the form container */}
          <motion.button
            type="button"
            aria-level="Go back to previous page"
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

          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Login to Medical Portal
          </h2>
          {message && (
            <div
              className={`text-center mb-4 p-2 rounded ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="font-bold block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute my-2 right-3 text-gray-500 text-2xl font-bold rounded"
              >
                {showPassword ? <RxEyeOpen /> : <LuEyeClosed />}
              </button>
            </div>
            <motion.button
              type="submit"
              whileHover={{
                backgroundColor: ["#00ff00", "#32cd32"], // Shining green effect
                transition: {
                  duration: 0.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                },
              }}
              onHoverEnd={() => {
                // Reset color back to blue when hover stops
                document.querySelector(".register-btn").style.backgroundColor =
                  "#155dfc"; // A shade of blue
              }}
              className="register-btn w-full text-white py-2 rounded-lg bg-blue-600 hover:font-bold hover:text-[17px] transition"
            >
              Login
            </motion.button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 font-bold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
