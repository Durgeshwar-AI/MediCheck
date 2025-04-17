import React from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const HospitalAppointments = ({ appointments, onAccept, onReject }) => {
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

            {/* Table with full scrollable content */}
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
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
                                    key={appointment.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="border-b border-gray-300 hover:bg-gray-200 transition duration-200"
                                >
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 font-medium text-xs sm:text-base">{appointment.patient}</td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs sm:text-base font-medium">{appointment.time}</span>
                                            <span className="text-xs text-gray-500">{appointment.date}</span>
                                        </div>
                                    </td>
                                    <td className="py-2 sm:py-3 px-2 sm:px-4 flex items-center justify-center gap-2 sm:gap-4">
                                        {/* Accept Button */}
                                        <motion.button
                                            className="bg-green-600 text-white px-2 sm:px-4 py-1 rounded-md text-xs md:text-sm shadow-md hover:bg-green-700 transition duration-200"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onAccept(appointment.id)}
                                        >
                                            Accept
                                        </motion.button>

                                        {/* Reject Button */}
                                        <motion.button
                                            className="bg-red-600 text-white h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition duration-200 font-bold"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => onReject(appointment.id)}
                                        >
                                            <RxCross2 size={20} className="sm:text-lg" />
                                        </motion.button>
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
        </motion.div>
    );
}
export default HospitalAppointments;