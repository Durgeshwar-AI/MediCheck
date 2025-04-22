import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  format,
  isBefore,
  getDaysInMonth as getDateFnsDaysInMonth,
} from "date-fns";
import { Plus } from "lucide-react";
import Header from "../../Components/UserDashboardParts/Header";
import UserSidebar from "../../Components/UserDashboardParts/UserSidebar";

const UserAppointments = () => {
  const URL = import.meta.env.VITE_API_URL;
  const tokenData = localStorage.getItem("authToken");
  const { value } = JSON.parse(tokenData);
  const token = value;

  const [appointments, setAppointments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [formData, setFormData] = useState({
    month: "",
    date: "",
    time: "",
    hospitalName: "",
    doctorType: "General Physician",
  });

  // Utility to parse appointment date
  const createDateTimeFromParts = (year, monthStr, date, time) => {
    const monthMap = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const [hour, minute] = time.split(":");
    return new Date(year, monthMap[monthStr], date, hour, minute);
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${URL}/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        const parsed = data.map((a) => {
          const currentYear = new Date().getFullYear();
          const dateTime = createDateTimeFromParts(
            currentYear,
            a.month,
            a.date,
            a.time
          );
          return {
            ...a,
            dateTime,
          };
        });
        setAppointments(parsed);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const getDaysInMonth = (month) => {
    const monthMap = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };
    const currentYear = new Date().getFullYear();
    return getDateFnsDaysInMonth(new Date(currentYear, monthMap[month]));
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setIsEditing(false);
    setFormData({
      month: "",
      date: "",
      time: "",
      hospitalName: "",
      doctorType: "General Physician",
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const currentYear = new Date().getFullYear();
    const dateTime = createDateTimeFromParts(
      currentYear,
      formData.month,
      formData.date,
      formData.time
    );

    if (isEditing) {
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === currentAppointmentId
            ? {
                ...formData,
                id: currentAppointmentId,
                dateTime,
              }
            : app
        )
      );
    } else {
      const newAppointment = {
        id: Date.now(),
        ...formData,
        dateTime,
      };
      setAppointments((prev) => [...prev, newAppointment]);
    }

    handleCloseForm();
  };

  const upcomingAppointments = appointments
    .filter((a) => !isBefore(a.dateTime, new Date()))
    .sort((a, b) => a.dateTime - b.dateTime);

  const pastAppointments = appointments
    .filter((a) => isBefore(a.dateTime, new Date()))
    .sort((a, b) => b.dateTime - a.dateTime);

  const renderAppointmentCard = (a, status) => (
    <div
      key={a._id}
      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 hover:shadow-lg transition-shadow"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <h3 className="font-semibold text-blue-700 text-lg mb-2 sm:mb-0">
          {a.hospitalName}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="mb-1">
            <span className="text-blue-800 font-medium mr-2">Specialty:</span>
            <span className="text-gray-700">{a.doctorType}</span>
          </div>
          <div>
            <span className="text-blue-800 font-medium mr-2">Status:</span>
            <span className="text-gray-700">{status}</span>
          </div>
          {status === "Accepted" && a.amountToBePaid && (
            <div>
              <span className="text-blue-800 font-medium mr-2">Amount:</span>
              <span className="text-gray-700">${a.amountToBePaid}</span>
            </div>
          )}
        </div>

        <div className="bg-green-50 p-3 rounded-md">
          <div className="mb-1">
            <span className="text-green-800 font-medium mr-2">Date:</span>
            <span className="text-gray-700">{format(a.dateTime, "PPP")}</span>
          </div>
          <div>
            <span className="text-green-800 font-medium mr-2">Time:</span>
            <span className="text-gray-700">{format(a.dateTime, "p")}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <UserSidebar />
        <div className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="md:text-3xl text-xl font-bold text-blue-500">
              My Appointments
            </h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenForm}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:text-blue-600 hover:bg-blue-200 border-2 border-white hover:border-blue-600 transition flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus size={20} />
              <span className="hidden md:block">New Appointment</span>
            </motion.button>
          </div>

          <div className="px-2 sm:px-4">
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 ml-2 text-teal-500">
                Upcoming Appointments
              </h2>
              <div className="h-0.5 w-full bg-teal-500 shadow-2xs mb-4"></div>
              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((a) =>
                  renderAppointmentCard(a, "Upcoming")
                )
              ) : (
                <p className="text-gray-500">
                  No upcoming appointments scheduled.
                </p>
              )}
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 ml-2 text-rose-500">
                Past Appointments
              </h2>
              <div className="h-0.5 w-full bg-rose-500 shadow-2xs mb-4"></div>
              {pastAppointments.length > 0 ? (
                pastAppointments.map((a) =>
                  renderAppointmentCard(a, "Completed")
                )
              ) : (
                <p className="text-gray-500">No past appointments found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
