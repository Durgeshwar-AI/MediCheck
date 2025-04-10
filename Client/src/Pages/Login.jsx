import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { storeToken, isLoggedIn } from "../utils/auth";
import { motion } from "framer-motion";



const URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in

  React.useEffect(() => {
    if (isLoggedIn()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleTogglePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before proceeding
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      setMessage("Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one digit, and one special symbol.");
      return;
    }

    try {
      const res = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        storeToken(data.token);
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        // redirect logic here if needed
        setTimeout(() => {
          navigate("/home");
        }, 500);
      } else {
        setMessage(data.message || "Login failed!!");
      }
    } catch (err) {
      setMessage("Something went wrong!! Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar join={false} />
      <div className="bg-blue-50 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Login to Medical Portal
          </h2>
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
                className="absolute my-2 right-3 text-gray-500  text-2xl font-bold rounded"
              >
                {showPassword ? <RxEyeOpen /> : <LuEyeClosed />
                }
              </button>
            </div>
            <motion.button
              whileTap={{
                scale: [null, 1.1],
                transition: {
                  duration: 0.5,
                  times: [0, 0.5],
                  ease: ["easeInOut", "easeOut"],
                },
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}

              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:font-bold hover:text-[17px] transition">
              Login
            </motion.button>
          </form>
          {message && (
            <p className={`text-center mt-4 font-medium ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          )}
          <p className="mt-4 text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-blue-600 font-bold">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;