import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import HospitalHeader from "../../Components/HospitalParts/HospitalHeader";
import HospitalSidebar from "../../Components/HospitalParts/HospitalSidebar";
import HospitalStatsCard from "../../Components/HospitalParts/HospitalStatsCard";
import BackToTopButton from "../../Components/FooterParts/BackToTopButton";

const HospitalAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [amount, setAmount] = useState("");

  const fetchAppointments = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      const tokenData = localStorage.getItem("authToken");
      const { value } = JSON.parse(tokenData);
      const token = value;

      const response = await axios.get(`${URL}/appointments/hospital`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setAppointments(response.data);
      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAcceptPrompt = (id) => {
    setSelectedAppointmentId(id);
    setShowAmountInput(true);
  };

  const handleAccept = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      await axios.put(`${URL}/appointments/${selectedAppointmentId}/accept`,{
        amount: Number(amount),
      });
      fetchAppointments();
      setShowAmountInput(false);
      setAmount("");
      setSelectedAppointmentId(null);
    } catch (err) {
      console.error("Error accepting appointment:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      const URL = import.meta.env.VITE_API_URL;
      await axios.put(`${URL}/appointments/${id}/reject`);
      fetchAppointments();
    } catch (err) {
      console.error("Error rejecting appointment:", err);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const pendingAppointments = appointments.filter(
    (app) => app.status === "pending"
  );
  const todaysAppointments = appointments.filter(
    (app) => app.status === "accepted"
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HospitalHeader />

      <div className="flex flex-grow">
        <HospitalSidebar />

        <main className="flex-grow p-6 overflow-auto">
          {isLoaded ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                <HospitalStatsCard
                  title="Pending Appointments"
                  value={pendingAppointments.length}
                  icon="📩"
                  bgColor="bg-yellow-100"
                />
                <HospitalStatsCard
                  title="Today's Appointments"
                  value={todaysAppointments.length}
                  icon="📅"
                  bgColor="bg-blue-100"
                />
                <HospitalStatsCard
                  title="Total Confirmed"
                  value={
                    appointments.filter((a) => a.status === "confirmed").length
                  }
                  icon="✅"
                  bgColor="bg-green-100"
                />
              </motion.div>

              {/* Pending Appointments */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mb-4">
                  Pending Appointment Requests
                </h2>
                {pendingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {pendingAppointments.map((app) => (
                      <motion.div
                        key={app._id}
                        className="bg-white p-4 shadow-md rounded-xl border-l-4 border-yellow-500"
                        variants={itemVariants}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-bold">
                              {app.name} ({app.age} yrs)
                            </h3>
                            <p className="text-sm text-gray-600">
                              Requested Time: {app.time}
                            </p>
                            <p className="text-sm text-gray-600">
                              Requested Date: {app.date}/{app.month}/{app.year}
                            </p>
                            <p className="text-sm font-semibold mt-1 text-yellow-700 capitalize">
                              Status: {app.status}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleAcceptPrompt(app._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
                              onClick={() => handleReject(app._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        {/* Modal Input for Amount */}
                        {showAmountInput && (
                          <div className="fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                              <h3 className="text-lg font-bold mb-4">
                                Enter Payment Amount
                              </h3>
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
                                  onClick={handleAccept}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    No pending appointment requests.
                  </p>
                )}
              </motion.div>

              {/* Today's Appointments */}
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold mt-6 mb-4">
                  Today&apos;s Appointments
                </h2>
                {todaysAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {todaysAppointments.map((app) => (
                      <motion.div
                        key={app._id}
                        className="bg-white p-4 shadow-md rounded-xl border-l-4 border-blue-500"
                        variants={itemVariants}
                      >
                        <div>
                          <h3 className="text-lg font-bold">
                            {app.name} ({app.age} yrs)
                          </h3>
                          <p className="text-sm text-gray-600">
                            Appointment Time: {app.time}
                          </p>
                          <p className="text-sm font-semibold mt-1 text-blue-700 capitalize">
                            Status: {app.status}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    No appointments scheduled for today.
                  </p>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </main>
      </div>

      <BackToTopButton />
    </div>
  );
};

export default HospitalAppointments;
