import { Plus, X, Trash2, Edit } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Appointment() {
  // State for the appointments list
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      month: "Mar",
      date: 15,
      name: "Dr. Smith - Cardiology",
      time: "09:00",
      location: "Memorial Hospital",
      type: "checkup",
    },
    {
      id: 2,
      month: "Mar",
      date: 23,
      name: "Blood Work",
      time: "11:30",
      location: "City Lab Center",
      type: "lab",
    },
  ]);

  // State to show/hide the create appointment popup
  const [showForm, setShowForm] = useState(false);
  
  // State to track if we're editing an existing appointment
  const [isEditing, setIsEditing] = useState(false);
  
  // State to track current appointment ID for editing
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);

  // Form data state for new appointment
  const [formData, setFormData] = useState({
    month: "",
    date: "",
    name: "",
    time: "",
    location: "",
    type: "checkup",
  });

  // Helper function returns days based on month selection.
  const getDaysInMonth = (month) => {
    switch (month) {
      case "Feb":
        return new Date().getFullYear() % 4 === 0 ? 29 : 28; // Leap year check
      case "Apr":
      case "Jun":
      case "Sep":
      case "Nov":
        return 30;
      case "Jan":
      case "Mar":
      case "May":
      case "Jul":
      case "Aug":
      case "Oct":
      case "Dec":
        return 31;
      default:
        return 31;
    }
  };

  // Open the popup for creating a new appointment
  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentAppointmentId(null);
    // Reset form data to empty values
    setFormData({
      month: "",
      date: "",
      name: "",
      time: "",
      location: "",
      type: "checkup",
    });
    setShowForm(true);
  };
  
  // Open the popup for editing an existing appointment
  const handleEditClick = (appointment) => {
    setIsEditing(true);
    setCurrentAppointmentId(appointment.id);
    // Populate form with existing appointment data
    setFormData({
      month: appointment.month,
      date: appointment.date.toString(),
      name: appointment.name,
      time: appointment.time,
      location: appointment.location,
      type: appointment.type,
    });
    setShowForm(true);
  };

  // Close the popup
  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  // Delete an appointment based on ID
  const handleDeleteAppointment = (id) => {
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  // Update form data state as the user types.
  // For "month" we reset date if a new month is selected.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "month") {
      setFormData({ ...formData, month: value, date: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Generate a unique ID for new appointments
  const generateNewId = () => {
    return appointments.length > 0 
      ? Math.max(...appointments.map(app => app.id)) + 1 
      : 1;
  };

  // Add the new appointment to the list or update existing and close the modal
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update existing appointment
      setAppointments(
        appointments.map(app => 
          app.id === currentAppointmentId 
            ? {
                ...app,
                month: formData.month,
                date: parseInt(formData.date),
                name: formData.name,
                time: formData.time,
                location: formData.location,
                type: formData.type,
              }
            : app
        )
      );
    } else {
      // Add new appointment with a unique ID
      setAppointments([
        ...appointments,
        {
          id: generateNewId(),
          month: formData.month,
          date: parseInt(formData.date),
          name: formData.name,
          time: formData.time,
          location: formData.location,
          type: formData.type,
        },
      ]);
    }

    // Reset form data and close the popup
    setFormData({
      month: "",
      date: "",
      name: "",
      time: "",
      location: "",
      type: "checkup",
    });
    setShowForm(false);
    setIsEditing(false);
  };

  return (
    <div className="bg-white border rounded-lg shadow-md mb-6 w-full max-w-4xl mx-auto">
      <div className="p-4 border-b flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">Upcoming Appointments</span>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateClick}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 hover:shadow-lg transition duration-300"
        >
          <Plus size={22} /> Create
        </motion.button>
      </div>

      {/* Appointment list */}
      <div className="p-2 h-auto md:h-[260px] overflow-y-auto">
        {appointments.length === 0 ? (
          <div className="flex justify-center items-center h-32 text-gray-500">
            No appointments scheduled
          </div>
        ) : (
          appointments.map((appointment) => (
            <Appointments
              key={appointment.id}
              appointment={appointment}
              onDelete={() => handleDeleteAppointment(appointment.id)}
              onEdit={() => handleEditClick(appointment)}
            />
          ))
        )}
      </div>

      {/* Popup modal form */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-50 backdrop-blur-md flex justify-center items-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {isEditing ? "Edit Appointment" : "Create Appointment"}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseForm}
                className="text-gray-600"
              >
                <X size={20} />
              </motion.button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Grid Layout for Month and Date */}
              <div className="grid grid-cols-2 gap-4">
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
                    <option value="" disabled>Select Month</option>
                    <option value="Jan">January</option>
                    <option value="Feb">February</option>
                    <option value="Mar">March</option>
                    <option value="Apr">April</option>
                    <option value="May">May</option>
                    <option value="Jun">June</option>
                    <option value="Jul">July</option>
                    <option value="Aug">August</option>
                    <option value="Sep">September</option>
                    <option value="Oct">October</option>
                    <option value="Nov">November</option>
                    <option value="Dec">December</option>
                  </select>
                  <label
                    htmlFor="month"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                  >
                    Month *
                  </label>
                </div>
                {/* Date Select (dynamic based on month) */}
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
                    <option value="" disabled>Select Date</option>
                    {formData.month &&
                      Array.from({ length: getDaysInMonth(formData.month) }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                  <label
                    htmlFor="date"
                    className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                  >
                    Date *
                  </label>
                </div>
              </div>

              {/* Time Field (using native time picker) */}
              <div className="relative">
                <input
                  type="time"
                  name="time"
                  id="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label
                  htmlFor="time"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Time *
                </label>
              </div>

              {/* Appointment Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder=""
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label
                  htmlFor="name"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Appointment Name *
                </label>
              </div>

              {/* Location Field */}
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder=""
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label
                  htmlFor="location"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Location *
                </label>
              </div>

              {/* Type Select */}
              <div className="relative">
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  <option value="checkup">Checkup</option>
                  <option value="lab">Lab</option>
                  <option value="vaccination">Vaccination</option>
                  <option value="specialist">Specialist</option>
                </select>
                <label
                  htmlFor="type"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Appointment Type
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  {isEditing ? "Update" : "Save"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// Component to display each appointment
function Appointments({ appointment, onDelete, onEdit }) {
  const { date, month, name, time, location, type } = appointment;
  
  const bgColors = {
    checkup: "bg-blue-100",
    lab: "bg-purple-100",
    vaccination: "bg-green-100",
    specialist: "bg-orange-100",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 mb-3 border rounded-lg hover:shadow-md transition-shadow">
      <div className={`md:col-span-1 flex items-center justify-center ${bgColors[type] || "bg-gray-100"} rounded-md p-2`}>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{date}</p>
          <p className="text-sm">{month}</p>
        </div>
      </div>
      <div className="md:col-span-4 flex flex-col justify-center">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-bold text-lg">{name}</p>
            <p className="text-gray-600">
              {time} - {location}
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              onClick={onEdit}
              whileTap={{ scale: 0.9 }}
              className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
            >
              <Edit size={18} />
            </motion.button>
            <motion.button
              onClick={onDelete}
              whileTap={{ scale: 0.9 }}
              className="text-rose-600 hover:text-rose-800 p-1 rounded-full hover:bg-rose-50"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;