import React from "react";
import Navbar from "../Components/Navbar";

const URL = import.meta.env.VITE_URL;

const Login = () => {
  return (
    <>
      <Navbar join={false}/>
    <div className="bg-blue-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Login to Medical Portal
        </h2>
        <form action="#" method="POST">
          <div className="mb-4">
            <label className="font-bold ml-1 p-1 block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="font-bold ml-1 p-1 block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href={`${URL}/register`} className="text-blue-600 font-bold">
            Register
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;