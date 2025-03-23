import React from "react";

const URL = import.meta.env.VITE_URL;

const Register = () => {
  return (
    <div className="bg-blue-50 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Create an Account
        </h2>
        <form action="#" method="POST">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href={`${URL}/login`} className="text-blue-600 font-bold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;