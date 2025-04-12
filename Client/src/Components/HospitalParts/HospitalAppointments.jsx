import React from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const HospitalAppointments = ({ appointments }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full transition duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {/* Title */}
            <h2 className="text-xl sm:text-2xl text-center font-bold mb-1">Next Appointments</h2>
            <div className="w-36 sm:w-45 h-0.5 bg-blue-500 mx-auto mb-4 sm:mb-7 rounded-full"></div>

            {/* Table */}
            <div className="overflow-x-auto max-h-64 sm:max-h-80 overflow-y-auto">
                <table className="min-w-full bg-gray-50 rounded-lg shadow-md text-sm sm:text-base">
                    <thead>
                        <tr className="bg-blue-100 text-gray-700">
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4">Patient</th>
                            <th className="text-left py-2 sm:py-3 px-2 sm:px-4">Time</th>
                            <th className="text-center py-2 sm:py-3 px-2 sm:px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.length > 0 ? (
                            appointments.map((appointment, index) => (
                                <motion.tr
                                    key={appointment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-gray-300 hover:bg-gray-200 transition duration-200"
                                >
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-base">{appointment.patient}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base">{appointment.time}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 flex items-center justify-center gap-2 sm:gap-4">
                                        {/* Accept Button */}
                                        <motion.button
                                            className="bg-green-600 text-white px-2 sm:px-4 py-1 rounded-md text-xs md:text-sm shadow-md hover:bg-green-700 transition duration-200"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Accept
                                        </motion.button>

                                        {/* Cancel Button */}
                                        {/* <motion.button
                                            className="bg-red-600 text-white h-7 w-7 sm:h-9 sm:w-9 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition duration-200"
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <RxCross2 size={16} className="sm:text-lg" />
                                        </motion.button> */}
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            // Empty State Handling
                            <tr>
                                <td colSpan="3" className="py-4 sm:py-5 text-center text-gray-500 text-sm sm:text-md md:text-lg font-normal md:font-medium">
                                    No upcoming appointments
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* View All Button */}
            <div className="flex justify-end mt-3 sm:mt-4">
                <motion.button
                    className="mx-auto bg-blue-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm shadow-md hover:bg-blue-700 transition duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/appointments")}
                >
                    View All
                </motion.button>
            </div>
        </motion.div>
    );
}
export default HospitalAppointments;