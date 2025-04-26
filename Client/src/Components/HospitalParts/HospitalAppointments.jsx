import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const HospitalAppointments = () => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [appointments, setAppointments] = useState([]);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, [appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${URL}/appointments/hospital`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data.filter((appointment) => appointment.status === "pending"));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleAcceptPrompt = (id) => {
    setSelectedAppointmentId(id);
    setShowAmountInput(true);
  };

  const confirmAccept = async () => {
    if (!amount || isNaN(amount)) return alert("Please enter a valid amount.");

    try {
      await axios.put(`${URL}/appointments/${selectedAppointmentId}/accept`, {
        amount: Number(amount),
      });
      fetchAppointments()
      setShowAmountInput(false);
      setAmount("");
      setSelectedAppointmentId(null);
    } catch (error) {
      console.error("Accept failed:", error);
    }
  };

  const onReject = async (id) => {
    try {
      await axios.put(`${URL}/appointments/${id}/reject`);
      fetchAppointments()
    } catch (error) {
      console.error("Reject failed:", error);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full transition duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-1">
        Next Appointments
      </h2>
      <div className="w-36 sm:w-45 h-0.5 bg-blue-500 mx-auto mb-4 sm:mb-7 rounded-full"></div>

      <div className="overflow-x-auto h-96 overflow-y-auto">
        <table className="min-w-full bg-gray-50 rounded-lg shadow-md text-sm sm:text-base">
          <thead>
            <tr className="bg-blue-100 text-gray-700 sticky top-0 z-10">
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4">Patient</th>
              <th className="text-left py-2 sm:py-3 px-2 sm:px-4">Schedule</th>
              <th className="text-center py-2 sm:py-3 px-2 sm:px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((appointment, index) => (
                <motion.tr
                  key={appointment._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="border-b border-gray-300 hover:bg-gray-200 transition duration-200"
                >
                  <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-base">
                    {appointment.name}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4">
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-base font-medium">
                        {appointment.time}
                      </span>
                      <span className="text-xs text-gray-500">
                        {appointment.date}/{appointment.month}/{appointment.year}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 flex items-center justify-center gap-2 sm:gap-4">
                    <motion.button
                      className="bg-green-600 text-white px-2 sm:px-4 py-1 rounded-md text-xs md:text-sm shadow-md hover:bg-green-700 transition duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAcceptPrompt(appointment._id)}
                    >
                      Accept
                    </motion.button>

                    <motion.button
                      className="bg-red-600 text-white h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition duration-200 font-bold"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => onReject(appointment._id)}
                    >
                      <RxCross2 size={20} className="sm:text-lg" />
                    </motion.button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="py-4 sm:py-5 text-center h-80 text-gray-500 text-sm sm:text-md md:text-lg font-normal md:font-medium"
                >
                  No upcoming appointments
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Input for Amount */}
      {showAmountInput && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h3 className="text-lg font-bold mb-4">Enter Payment Amount</h3>
            <input
              type="number"
              placeholder="Amount"
              className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-3 py-1 rounded-md hover:bg-gray-400"
                onClick={() => {
                  setShowAmountInput(false);
                  setAmount("");
                }}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                onClick={confirmAccept}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default HospitalAppointments;
