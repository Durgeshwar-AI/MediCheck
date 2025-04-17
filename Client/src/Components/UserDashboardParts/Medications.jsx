import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";

function Medications() {
  const [meds, setMeds] = useState([
    { id: 1, name: "Lisinopril", dosage: "10mg", schedule: "Daily - Morning", refill: "May 15" },
    { id: 2, name: "Metformin", dosage: "500mg", schedule: "Twice daily", refill: "April 30" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", dosage: "", schedule: "", refill: "" });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => field.trim() === "")) return;

    setMeds([...meds, { ...formData, id: meds.length + 1 }]);
    setFormData({ name: "", dosage: "", schedule: "", refill: "" });
    setShowForm(false);
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
            <Plus /> Add 
          </motion.button>
        </div>

        <div className="mt-4 space-y-4 h-[270px] overflow-y-auto">
          {meds.map((med) => (
            <div key={med.id} className="grid grid-cols-12 items-center w-full p-3 mb-3 border rounded-lg">
              <div className="flex flex-col col-span-8">
                <div className="font-medium">{med.name} {med.dosage}</div>
                <div className="text-sm text-gray-500">{med.schedule}</div>
              </div>
              <div className="flex flex-col col-span-3">
                <div className="text-sm text-gray-500">Refill by</div>
                <div className="font-medium">{med.refill}</div>
              </div>
              <button className="text-red-500 hover:text-red-700 transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          ))}
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
            <h2 className="text-2xl font-bold mb-6 text-center">Add Medication</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Medication Name</label>
                <input
                  id="medicationName"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dosage</label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Schedule</label>
                <input
                  type="text"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Refill Date</label>
                <input
                  type="date"
                  name="refill"
                  value={formData.refill}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="flex justify-between pt-4">
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
            </form>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Medications;