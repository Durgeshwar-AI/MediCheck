import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format, isBefore } from 'date-fns';
import Header from '../../Components/UserDashboardParts/Header';
import UserSidebar from '../../Components/UserDashboardParts/UserSidebar';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    // You can load appointments from backend here
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const newAppointment = {
      id: Date.now(),
      ...formData,
      dateTime: new Date(`${formData.date}T${formData.time}`)
    };
    setAppointments(prev => [...prev, newAppointment]);
    setFormData({ doctor: '', date: '', time: '', reason: '' });
  };

  const upcomingAppointments = appointments.filter(
    a => !isBefore(a.dateTime, new Date())
  );

  const pastAppointments = appointments.filter(
    a => isBefore(a.dateTime, new Date())
  );

  const renderAppointmentCard = (a) => (
    <div key={a.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      <h3 className="font-semibold text-blue-700">Dr. {a.doctor}</h3>
      <p><strong>Date:</strong> {format(a.dateTime, 'PPP')}</p>
      <p><strong>Time:</strong> {format(a.dateTime, 'p')}</p>
      <p><strong>Reason:</strong> {a.reason}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-grow">
        <UserSidebar />
        <main className="flex-1 flex flex-col justify-center items-center p-6">
          <motion.h2
            className="text-3xl font-bold text-center text-blue-700 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            My Appointments
          </motion.h2>

          <motion.div
            className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleAddAppointment} className="space-y-4">
              <input
                type="text"
                name="doctor"
                placeholder="Doctor's Name"
                value={formData.doctor}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
              <textarea
                name="reason"
                placeholder="Reason for visit"
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg"
              ></textarea>

              <motion.button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
                whileTap={{ scale: 0.95 }}
              >
                Add Appointment
              </motion.button>
            </form>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-blue-600">Upcoming Appointments</h3>
              <div className="space-y-4">
                {upcomingAppointments.length ? upcomingAppointments.map(renderAppointmentCard) : <p>No upcoming appointments.</p>}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Past Appointments</h3>
              <div className="space-y-4">
                {pastAppointments.length ? pastAppointments.map(renderAppointmentCard) : <p>No past appointments.</p>}
              </div>
            </motion.div>
          </div>
          </main>
      </div>
    </div>
  );
};

export default UserAppointments;
