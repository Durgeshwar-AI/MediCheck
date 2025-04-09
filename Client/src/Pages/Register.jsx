import React, { useState } from "react";
import Navbar from "../Components/Navbar";

const URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: { firstname:firstname, lastname:lastname },
          email,
          phone,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Registration successful!");
        // redirect logic here if needed
      } else {
        const err = data.errors?.[0]?.msg || data.message;
        setMessage(err || "Registration failed.");
      }
    } catch (err) {
      console.log(err)
      setMessage(`Something went wrong:`);
    }
  };

  return (
    <>
      <Navbar join={false} />
      <div className="bg-blue-50 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="font-bold block text-gray-700">First Name</label>
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
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your phone number"
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
              Register
            </button>
          </form>
          {message && (
            <p className="text-red-600 text-center mt-4 font-medium">{message}</p>
          )}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-bold">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
