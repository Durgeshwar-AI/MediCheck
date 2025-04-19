import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";

function Medications() {
  const API_URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [meds, setMeds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    schedule: "",
    month: "",
    date: "",
    year: new Date().getFullYear().toString(),
  });

  useEffect(() => {
    fetchMedications();
  });

  const fetchMedications = async () => {
    try {
      const res = await fetch(`${API_URL}/medications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMeds(data);
    } catch (err) {
      console.error("Failed to fetch medications:", err);
    }
  };

  useEffect(() => {
    if (showForm) {
      document.getElementById("medicationName")?.focus();
    }
  }, [showForm]);

  const handleCreateClick = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isLeapYear = (year) => {
    const yearNum = parseInt(year);
    return (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
  };

  const getDaysInMonth = (month, year) => {
    const monthMap = {
      Jan: 31,
      Feb: isLeapYear(year) ? 29 : 28,
      Mar: 31,
      Apr: 30,
      May: 31,
      Jun: 30,
      Jul: 31,
      Aug: 31,
      Sep: 30,
      Oct: 31,
      Nov: 30,
      Dec: 31,
    };
    return monthMap[month] || 31;
  };

  useEffect(() => {
    if (
      formData.month === "Feb" &&
      formData.date &&
      parseInt(formData.date) > getDaysInMonth("Feb", formData.year)
    ) {
      setFormData((prev) => ({
        ...prev,
        date: getDaysInMonth("Feb", formData.year).toString(),
      }));
    }
  }, [formData.month, formData.year]);

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
    const refill = `${formData.month} ${formData.date}`;

    const newMed = {
      name: formData.name,
      dosage: formData.dosage,
      schedule: formData.schedule,
      date: formData.date,
      month: formData.month,
      year: formData.year,
    };

    try {
      const res = await fetch(`${API_URL}/medications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newMed),
      });

      if (res.ok) {
        const savedMed = await res.json();
        setMeds((prev) => [...prev, savedMed]);
        setShowForm(false);
        setFormData({
          name: "",
          dosage: "",
          schedule: "",
          month: "",
          date: "",
          year: new Date().getFullYear().toString(),
        });
      } else {
        console.error("Error adding medication");
      }
    } catch (err) {
      console.error("Failed to submit medication:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/medications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setMeds((prev) =>
          prev.filter((med) => med._id !== id && med.id !== id)
        );
      } else {
        console.error("Error deleting medication");
      }
    } catch (err) {
      console.error("Failed to delete medication:", err);
    }
  };
  return (
    <>
      {/* Medications List */}
      <div className="bg-white border rounded-lg shadow-lg mb-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl text-gray-800">Medications</h2>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="hover:text-white font-semibold px-2 py-2 rounded-lg flex items-center gap-2
              hover:bg-blue-500 hover:shadow-lg transition duration-300 border-2 hover:border-gray-50
               hover:scale-105 bg-white border-blue-500 text-blue-500"
            onClick={handleCreateClick}
          >
            <Plus size={20} /> Add
          </motion.button>
        </div>
        <hr className="mt-4" />
        <div className="mt-4 space-y-4 h-[270px] overflow-y-auto">
          {meds.length === 0 ? (
            <div className="flex flex-col text-center items-center h-full text-gray-500">
              <p className="text-base font-medium mt-15">No medication data stored yet</p>
              <p className="text-xs mt-4">Click the Add button to create your first medication</p>
            </div>
          ) : (
            meds.map((med) => (
              <div
                key={med._id}
                className="p-4 border rounded-xl flex justify-between items-center"
              >
                <div className="flex flex-col">
                  <div className="font-semibold text-lg">
                    {med.name} {med.dosage}
                  </div>
                  <div className="text-gray-500">{med.schedule}</div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col items-end mr-3">
                    <div className="text-sm text-gray-500">Refill by</div>
                    <div className="font-semibold">
                      {med.date}, {med.month} {med.year}
                    </div>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors p-1"
                    onClick={() => handleDelete(med._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl bg-white border-2 p-6 rounded-lg shadow-lg border-blue-500"
          >
            <div className="relative flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-center w-full">Add Medication</h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseForm}
                className="text-gray-600 p-2 rounded-full hover:bg-gray-200 transition duration-300 absolute top-0 right-2"
                aria-label="Close form"
              >
                <X size={20} />
              </motion.button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {/* Medication Name */}
                <div className="relative">
                  <input
                    id="medicationName"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                  />
                  <label
                    htmlFor="medicationName"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-red-400 font-bold"
                  >
                    Medication Name *
                  </label>
                </div>

                {/* Dosage */}
                <div className="relative">
                  <input
                    type="text"
                    name="dosage"
                    value={formData.dosage}
                    onChange={handleChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                  />
                  <label
                    htmlFor="dosage"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-red-400 font-bold"
                  >
                    Dosage *
                  </label>
                </div>

                {/* Schedule */}
                <div className="relative col-span-2">
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                  />
                  <label
                    htmlFor="schedule"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-red-400 font-bold"
                  >
                    Schedule *
                  </label>
                </div>

                {/* Month Select */}
                <div className="relative">
                  <select
                    name="month"
                    id="month"
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
                    ].map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="month"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-rose-500"
                  >
                    Refill Month *
                  </label>
                </div>

                {/* Date Select */}
                <div className="relative">
                  <select
                    name="date"
                    id="date"
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
                        {
                          length: getDaysInMonth(formData.month, formData.year),
                        },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                  </select>
                  <label
                    htmlFor="date"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-rose-500"
                  >
                    Refill Date *
                  </label>
                </div>

                {/* Year Select */}
                <div className="relative col-span-2">
                  <select
                    name="year"
                    id="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    required
                  >
                    {Array.from({ length: 26 }, (_, i) => 2025 + i).map(
                      (year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      )
                    )}
                  </select>
                  <label
                    htmlFor="year"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-rose-500"
                  >
                    Year *
                  </label>
                </div>

                {/* Buttons */}
                <div className="flex justify-between pt-4 col-span-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseForm}
                    className="px-4 py-2 shadow-md text-rose-600 border rounded-lg font-bold hover:bg-red-300 hover:text-white transition duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="px-4 font-bold py-2 bg-gradient-to-br from-green-600 via-green-400 to-green-200 text-white rounded-lg hover:scale-105 hover:shadow-md transition duration-300 ease-in-out"
                  >
                    Save
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Medications;