import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const URL = import.meta.env.VITE_API_URL; // Make sure it's like http://localhost:5000/api

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
        // redirect logic here if needed
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Something went wrong.");
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
              />
            </div>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
              />
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>
          {message && (
            <p className="text-red-600 text-center mt-4 font-medium">{message}</p>
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
