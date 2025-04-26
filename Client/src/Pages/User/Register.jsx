import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { easeInOut, motion } from "framer-motion";
import logo from "../../assets/logo.png";
import { LuEyeClosed } from "react-icons/lu";
import { RxEyeOpen } from "react-icons/rx";
import { ArrowLeftFromLine } from "lucide-react";
import { storeToken, isLoggedIn } from "../../utils/auth";
import { useHealth } from "../../hooks/useHealth";

const URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { updateLogin, updateType } = useHealth();

  // Redirect if already logged in
  useEffect(() => {
    // Check directly from auth.js to ensure initial state is correct
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

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10); // Restricts to 10 digits
    setPhone(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage(
        "⚠️ Password must include at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special symbol like: @$!%*?&"
      );
      return;
    }
    const nameRegex = /^[A-Za-z]+$/;
    // Name validation
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      setMessage(
        "⚠️ Name must contain only letters without spaces or special characters."
      );
      return;
    }

    try {
      const res = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: { firstname, lastname },
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store token with 7-day expiration
        storeToken(
          data.token,
          data.firstname,
          data.email,
          data.type,
          data.company
        );
        // localStorage.setItem("token", data.token);
        setMessage("✅ Registration successful!");
        // Redirect to home page after successful registration
        updateLogin(true);
        updateType(data.type);
        navigate("/home");
      } else {
        setMessage(
          data.errors?.[0]?.msg || data.message || "❌ Registration failed!"
        );
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong. Please try again.");
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
        <div className="hidden md:flex flex-grow justify-end"></div>
      </motion.header>
      <div className="bg-blue-50 flex items-center justify-center min-h-screen py-10">
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
              transition: { duration: 1, ease: easeInOut }, // Add a transition for the rotation
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 flex items-center"
            aria-describedby="go-back-tooltip"
          >
            <ArrowLeftFromLine />
          </motion.button>

          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your last name"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                maxLength={10}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
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
              Register
            </motion.button>
          </form>
          {message && (
            <p
              className={`text-center mt-4 font-medium ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              } text-xs`}
            >
              {message}
            </p>
          )}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
