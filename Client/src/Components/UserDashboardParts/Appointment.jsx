import { Plus, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Appointment() {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    month: "",
    date: "",
    time: "",
    hospitalName: "",
    doctorType: "General Physician",
    name: "",
    age: "",
  });

  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      const response = await fetch(`${URL}/hospital`);
      const data = await response.json();
      setHospitals(data);
    };
    fetchHospitals();
  }, []);

  const getDaysInMonth = (month) => {
    switch (month) {
      case "Feb":
        return new Date().getFullYear() % 4 === 0 ? 29 : 28;
      case "Apr":
      case "Jun":
      case "Sep":
      case "Nov":
        return 30;
      default:
        return 31;
    }
  };

  const handleCreateClick = () => {
    setFormData({
      month: "",
      date: "",
      time: "",
      hospitalName: "",
      doctorType: "General Physician",
      name: "",
      age: "",
    });
    setShowForm(true);
  };

  const handleCloseForm = () => setShowForm(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "month") {
      setFormData({ ...formData, month: value, date: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      id: Date.now(),
      date: formData.date.toString(),
      age: formData.age.toString(),
    };

    const res = await fetch(`${URL}/appointments/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    console.log(res.status);
    setShowForm(false);
  };

  return (
    <div className="bg-white border rounded-lg shadow-md mb-6 w-full max-w-4xl mx-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">
          Upcoming Appointments
        </span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 hover:shadow-lg transition duration-300"
        >
          <Plus size={22} /> Create
        </motion.button>
      </div>

      <div className="p-2 h-[291px] overflow-y-auto">
        {appointments.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            No appointments scheduled
          </div>
        ) : (
          appointments.map((appointment) => (
            <Appointments key={appointment.id} appointment={appointment} />
          ))
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-500"
          >
            <div className="relative flex justify-between items-center mb-3">
              <h2 className="text-2xl font-semibold text-sky-500">
                Create Appointment
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseForm}
                className="text-gray-600 p-2 rounded-full hover:bg-gray-200 transition duration-300 absolute -top-1 right-2"
              >
                <X size={20} />
              </motion.button>
            </div>
            <hr className="border-gray-600 mb-6" />
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="Enter Patient Name"
                  required
                />
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Patient Name *
                </label>
              </div>

              <div className="relative">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  placeholder="Enter Patient Age"
                  min="0"
                  required
                />
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Patient Age *
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    name="month"
                    value={formData.month}
                    onChange={handleInputChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                  >
                    <option value="" disabled>
                      Select Month
                    </option>
                    {[
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                    Month *
                  </label>
                </div>
                <div className="relative">
                  <select
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                    disabled={!formData.month}
                  >
                    <option value="" disabled>
                      Select Date
                    </option>
                    {formData.month &&
                      Array.from(
                        { length: getDaysInMonth(formData.month) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                  </select>
                  <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                    Date *
                  </label>
                </div>
              </div>

              <div className="relative">
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Time *
                </label>
              </div>

              <div className="relative">
                <select
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                >
                  <option value="" disabled>
                    Select Hospital
                  </option>
                  {hospitals.map((hosp, idx) => (
                    <option key={idx} value={hosp}>
                      {hosp}
                    </option>
                  ))}
                </select>
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Hospital Name *
                </label>
              </div>

              <div className="relative">
                <select
                  name="doctorType"
                  value={formData.doctorType}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  {[
                    "General Physician",
                    "Cardiology",
                    "Dermatology",
                    "ENT",
                    "Gynecology",
                    "Neurology",
                    "Ophthalmology",
                    "Orthopedics",
                    "Pediatrics",
                    "Psychiatry",
                    "Radiology",
                    "Pathology",
                  ].map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <label className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500">
                  Doctor's Specialty
                </label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={handleCloseForm}
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 border rounded-md text-rose-600 border-rose-600 hover:bg-rose-50 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-200 hover:text-green-800 border border-white hover:border-green-800 transition"
                >
                  Save
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function Appointments({ appointment }) {
  const { date, month, time, hospitalName, doctorType } = appointment;
  const bgColors = {
    "General Physician": "bg-blue-100",
    ENT: "bg-purple-100",
    Cardiology: "bg-red-100",
    Dermatology: "bg-green-100",
    Gynecology: "bg-pink-100",
    Neurology: "bg-yellow-100",
    Ophthalmology: "bg-indigo-100",
    Orthopedics: "bg-orange-100",
    Pediatrics: "bg-teal-100",
    Psychiatry: "bg-cyan-100",
    Radiology: "bg-amber-100",
    Pathology: "bg-lime-100",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 mb-3 border rounded-lg hover:shadow-md transition-shadow">
      <div
        className={`md:col-span-1 flex items-center justify-center ${
          bgColors[doctorType] || "bg-gray-100"
        } rounded-md p-2`}
      >
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{date}</p>
          <p className="text-sm">{month}</p>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col justify-center">
        <p className="font-bold text-lg">{doctorType}</p>
        <p className="text-gray-600">
          {time} - {hospitalName}
        </p>
      </div>
    </div>
  );
}

export default Appointment;
