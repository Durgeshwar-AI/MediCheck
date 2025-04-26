import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import HospitalHeader from "../../Components/HospitalParts/HospitalHeader";
import HospitalSidebar from "../../Components/HospitalParts/HospitalSidebar";
import BackToTopButton from "../../Components/FooterParts/BackToTopButton";

const PASSWORD = "admin123";

const HospitalDoctors = () => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    department: "",
    expertise: "",
    contact: "",
    experience: "",
  });
  const [passwordInput, setPasswordInput] = useState("");
  const [error, setError] = useState("");

  // Fetch doctors from backend
  useEffect(() => {
    axios
      .get(`${URL}/hospital/doctors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDoctors(res.data))
      .catch((err) => console.error("Error fetching doctors:", err));
  }, [doctors]);

  // Add a doctor
  const handleAddDoctor = () => {
  if (passwordInput === PASSWORD) {
    axios
      .post(
        `${URL}/hospital/doctor`,
        newDoctor,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setDoctors((prev) => [...prev, res.data]);
        setNewDoctor({
          name: "",
          department: "",
          expertise: "",
          contact: "",
          experience: "",
        });
        setShowAddForm(false);
        setPasswordInput("");
        setError("");
      })
      .catch((err) => {
        console.error("Error adding doctor:", err);
        setError("Failed to add doctor");
      });
  } else {
    setError("Incorrect password!");
  }
};

  const handleRemoveDoctor = (id) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this doctor?"
    );
    if (confirmRemove) {
      const enteredPassword = prompt("Enter password to remove doctor:");
      if (enteredPassword === PASSWORD) {
        axios
          .delete(`${URL}/hospital/doctor/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => {
            setDoctors((prev) => prev.filter((d) => d._id !== id));
          })
          .catch((err) => {
            console.error("Error deleting doctor:", err);
            alert("Failed to delete doctor");
          });
      } else {
        alert("Incorrect password!");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />
      <div className="flex flex-grow">
        <HospitalSidebar />
        <main className="flex-grow p-6 overflow-auto space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Our Doctors</h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {showAddForm ? "Cancel" : "Add Doctor"}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Department"
                value={newDoctor.department}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, department: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Expertise"
                value={newDoctor.expertise}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, expertise: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Contact Email"
                value={newDoctor.contact}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, contact: e.target.value })
                }
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Experience"
                value={newDoctor.experience}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, experience: e.target.value })
                }
              />
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Enter Admin Password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                onClick={handleAddDoctor}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Save Doctor
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <motion.div
                key={doctor._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-lg shadow cursor-pointer"
                onClick={() => setSelectedDoctor(doctor)}
              >
                <h3 className="text-lg font-semibold">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.department}</p>
                <p className="text-sm text-blue-600">{doctor.expertise}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDoctor(doctor._id);
                  }}
                  className="text-red-500 text-xs mt-2 underline"
                >
                  Remove
                </button>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedDoctor && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  className="bg-white p-6 rounded-lg w-full max-w-lg shadow-lg relative"
                >
                  <button
                    onClick={() => setSelectedDoctor(null)}
                    className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-red-500"
                  >
                    ✖
                  </button>
                  <h2 className="text-2xl font-bold mb-2">
                    {selectedDoctor.name}
                  </h2>
                  <p>
                    <strong>Department:</strong> {selectedDoctor.department}
                  </p>
                  <p>
                    <strong>Expertise:</strong> {selectedDoctor.expertise}
                  </p>
                  <p>
                    <strong>Experience:</strong> {selectedDoctor.experience}
                  </p>
                  <p>
                    <strong>Contact:</strong> {selectedDoctor.contact}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
      <BackToTopButton />
    </div>
  );
};

export default HospitalDoctors;