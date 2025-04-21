import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, isBefore, getDaysInMonth as getDateFnsDaysInMonth } from 'date-fns';
import { Plus, X, Trash2, Edit } from 'lucide-react';
import Header from '../../Components/UserDashboardParts/Header';
import UserSidebar from '../../Components/UserDashboardParts/UserSidebar';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [formData, setFormData] = useState({
    month: '',
    date: '',
    time: '',
    doctorName: '',
    hospitalName: '',
    doctorType: 'General Physician'
  });

  useEffect(() => {
    // You can load appointments from backend here
    // Placeholder for demo
    const demoAppointments = [
      {
        id: 1,
        month: 'Apr',
        date: 15,
        time: '10:00',
        doctorName: 'Dr. Smith',
        hospitalName: 'City Hospital',
        doctorType: 'Cardiology',
        dateTime: new Date('2025-04-15T10:00:00')
      },
      {
        id: 2,
        month: 'Apr',
        date: 5,
        time: '14:30',
        doctorName: 'Dr. Johnson',
        hospitalName: 'Medical Center',
        doctorType: 'Dermatology',
        dateTime: new Date('2025-04-05T14:30:00')
      }
    ];
    setAppointments(demoAppointments);
  }, []);

  const getDaysInMonth = (month) => {
    const monthMap = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    };

    const currentYear = new Date().getFullYear();
    return getDateFnsDaysInMonth(new Date(currentYear, monthMap[month]));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleOpenForm = () => {
    setIsFormOpen(true);
    setIsEditing(false);
    setFormData({
      month: '',
      date: '',
      time: '',
      doctorName: '',
      hospitalName: '',
      doctorType: 'General Physician'
    });
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Convert month and date to proper format for datetime
    const monthMap = {
      'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
      'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
    };

    const currentYear = new Date().getFullYear();
    const formattedDate = formData.date < 10 ? `0${formData.date}` : formData.date;
    const dateString = `${currentYear}-${monthMap[formData.month]}-${formattedDate}T${formData.time}:00`;

    if (isEditing) {
      // Update existing appointment
      setAppointments(prev => prev.map(app =>
        app.id === currentAppointmentId ? {
          ...formData,
          id: currentAppointmentId,
          dateTime: new Date(dateString)
        } : app
      ));
    } else {
      // Add new appointment
      const newAppointment = {
        id: Date.now(),
        ...formData,
        dateTime: new Date(dateString)
      };
      setAppointments(prev => [...prev, newAppointment]);
    }

    handleCloseForm();
  };

  const handleEdit = (appointment) => {
    setIsEditing(true);
    setCurrentAppointmentId(appointment.id);
    setFormData({
      month: appointment.month,
      date: appointment.date,
      time: appointment.time,
      doctorName: appointment.doctorName,
      hospitalName: appointment.hospitalName,
      doctorType: appointment.doctorType
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };

  // Filter and sort appointments by date and time
  const upcomingAppointments = appointments
    .filter(a => !isBefore(a.dateTime, new Date()))
    .sort((a, b) => a.dateTime - b.dateTime); // Sort by date/time (earliest first)

  const pastAppointments = appointments
    .filter(a => isBefore(a.dateTime, new Date()))
    .sort((a, b) => b.dateTime - a.dateTime); // Sort by date/time (most recent first)

  const renderAppointmentCard = (a) => (
    <div key={a.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
        <h3 className="font-semibold text-blue-700 text-lg mb-2 sm:mb-0">{a.doctorName}</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(a)}
            className="text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1 rounded-md transition"
          >
            <Edit size={20} />
          </button>
          <button
            onClick={() => handleDelete(a.id)}
            className="text-red-500 hover:text-red-700 bg-red-50 px-3 py-1 rounded-md transition"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="bg-blue-50 p-3 rounded-md">
          <div className="flex items-center mb-1">
            <span className="text-blue-800 font-medium mr-2">Specialty:</span>
            <span className="text-gray-700">{a.doctorType}</span>
          </div>
          <div className="flex items-center">
            <span className="text-blue-800 font-medium mr-2">Hospital:</span>
            <span className="text-gray-700">{a.hospitalName}</span>
          </div>
        </div>

        <div className="bg-green-50 p-3 rounded-md">
          <div className="flex items-center mb-1">
            <span className="text-green-800 font-medium mr-2">Date:</span>
            <span className="text-gray-700">{format(a.dateTime, 'PPP')}</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-800 font-medium mr-2">Time:</span>
            <span className="text-gray-700">{format(a.dateTime, 'p')}</span>
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
            <h1 className="md:text-3xl text-xl font-bold text-blue-500 ">My Appointments</h1>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenForm}
              className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-xl shadow-sm hover:text-blue-600 hover:bg-blue-200 border-2 border-white hover:border-blue-600 transition flex items-center gap-2 text-sm sm:text-base"
            >
              <Plus size={20} /><span className='hidden md:block'>New Appointment</span>
            </motion.button>
          </div>
          <div className="px-2 sm:px-4">
            {/* Upcoming Appointments */}
            <div className="mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 ml-2 text-teal-500">
                Upcoming Appointments
              </h2>
              <div className="h-0.5 w-full bg-teal-500 shadow-2xs mb-4"></div>

              {upcomingAppointments.length > 0 ? (
                upcomingAppointments.map(renderAppointmentCard)
              ) : (
                <p className="text-gray-500">No upcoming appointments scheduled.</p>
              )}
            </div>

            {/* Past Appointments */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 ml-2 text-rose-500">Past Appointments</h2>
              <div className="h-0.5 w-full bg-rose-500 shadow-2xs mb-4"></div>
              {pastAppointments.length > 0 ? (
                pastAppointments.map(renderAppointmentCard)
              ) : (
                <p className="text-gray-500">No past appointments found.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {isFormOpen && (
        <div className="flex-1 flex flex-col justify-center items-center p-6 fixed inset-0 bg-transparent bg-opacity-50 backdrop-blur-md   z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-4 sm:p-8 rounded-xl shadow-xl w-full max-w-md border border-blue-500 max-h-[90vh] overflow-y-auto"
          >
            <div className="relative flex justify-between items-center mb-3">
              <h2 className={`text-xl sm:text-2xl font-semibold ${isEditing ? "text-green-500" : "text-sky-500"}`}>
                {isEditing ? "Edit Appointment" : "Create Appointment"}
              </h2>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseForm}
                className="text-gray-600 p-2 rounded-full hover:bg-gray-200 transition duration-300"
              >
                <X size={20} />
              </motion.button>
            </div>
            <hr className="border-gray-600 mb-6" />
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

              {/* Doctor's Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="doctorName"
                  id="doctorName"
                  value={formData.doctorName}
                  onChange={handleInputChange}
                  placeholder=""
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label
                  htmlFor="doctorName"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Doctor&apos;s Name *
                </label>
              </div>

              {/* Hospital Name Field */}
              <div className="relative">
                <input
                  type="text"
                  name="hospitalName"
                  id="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  placeholder=""
                  className="peer block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  required
                />
                <label
                  htmlFor="hospitalName"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Hospital Name *
                </label>
              </div>

              {/* Doctor Type Select */}
              <div className="relative">
                <select
                  name="doctorType"
                  id="doctorType"
                  value={formData.doctorType}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                >
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="ENT">ENT</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Pathology">Pathology</option>
                </select>
                <label
                  htmlFor="doctorType"
                  className="absolute left-3 -top-3 text-xs bg-white px-1 text-gray-500"
                >
                  Doctor&apos;s Specialty
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
                  className={`px-4 py-2 text-white rounded-md hover:bg-green-600 transition ${isEditing ? 'bg-green-500' : 'bg-blue-500'}`}
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
};

export default UserAppointments;