import React from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom"; // Import navigation

export default function HospitalAppointments({ appointments }) {
  const navigate = useNavigate(); // Initialize navigation hook

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Title */}
      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">Next Appointments</h2>
      <div className="w-32 h-1 bg-blue-500 mx-auto mb-5 rounded-full"></div>

      {/* Table */}
      <div className="overflow-x-auto max-h-80 overflow-y-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow-md">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="text-left py-3 px-4">Patient</th>
              <th className="text-left py-3 px-4">Time</th>
              <th className="text-center py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment, index) => (
                <motion.tr
                  key={appointment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-300 hover:bg-gray-200 transition duration-200"
                >
                  <td className="py-3 px-4 font-medium">{appointment.patient}</td>
                  <td className="py-3 px-4">{appointment.time}</td>
                  <td className="py-3 px-4 flex items-center justify-center gap-4">
                    {/* Accept Button */}
                    <motion.button
                      className="bg-green-600 text-white px-4 py-1 rounded-md text-sm shadow-md hover:bg-green-700 transition duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Accept
                    </motion.button>

                    {/* Cancel Button */}
                   
                    {/* <motion.button
                      className="bg-red-600 text-white h-9 w-9 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition duration-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <RxCross2 size={18} />
                    </motion.button> */}
                  </td>
                </motion.tr>
              ))
            ) : (
              // Empty State Handling
              <tr>
                <td colSpan="3" className="py-5 text-center text-gray-500 text-lg font-medium">
                  No upcoming appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View All Button */}
      <div className="flex justify-end mt-4">
        <motion.button
          className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm shadow-md hover:bg-blue-700 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/appointments")} // Redirects to the appointments page
        >
          View All
        </motion.button>
      </div>
    </motion.div>
  );
}