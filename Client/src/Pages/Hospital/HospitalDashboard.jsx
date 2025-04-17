import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import components
import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import HospitalAppointments from '../../Components/HospitalParts/HospitalAppointments';
import HospitalFacilities from '../../Components/HospitalParts/HospitalFacilities';
import PatientForm from '../../Components/HospitalParts/PatientForm';
import PatientList from '../../Components/HospitalParts/PatientList';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

// Helper function to get formatted date
const getFormattedDate = (daysFromNow = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

const TODAY = new Date().toDateString(); // Automatically sets today's date
const TOMORROW = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString(); // Adds 1 day
const DAY_AFTER_TOMORROW = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString(); // Adds 2 days



// Updated initial appointments data with today's date
const initialAppointments = [
    { id: 1, patient: 'Emily Wilson', time: '09:30 AM', date: TODAY },
    { id: 2, patient: 'Robert Davis', time: '10:15 AM', date: TODAY },
    { id: 3, patient: 'Maria Rodriguez', time: '11:00 AM', date: TODAY },
    { id: 4, patient: 'James Brown', time: '11:45 AM', date: TOMORROW },
    { id: 5, patient: 'Lisa Thompson', time: '01:30 PM', date: TOMORROW },
    { id: 6, patient: 'Charles Miller', time: '02:15 PM', date: TOMORROW },
    { id: 7, patient: 'Sophia Garcia', time: '03:00 PM', date: TOMORROW },
    { id: 8, patient: 'Michael Smith', time: '11:00 AM', date: DAY_AFTER_TOMORROW },
    { id: 9, patient: 'Olivia Hernandez', time: '03:45 PM', date: DAY_AFTER_TOMORROW },
    { id: 10, patient: 'William Johnson', time: '04:30 PM', date: DAY_AFTER_TOMORROW }
];

// Available time slots (used for reassignment when an appointment is rejected)
const timeSlots = [
    '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '01:30 PM', 
    '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM'
];
const mockFacilities = {
    generalWard: { available: 18, occupied: 32, percentFull: 64 },
    icu: { available: 3, occupied: 7, percentFull: 70 },
    operatingRooms: { available: 2, inUse: 3, percentInUse: 60 },
    emergency: { onDuty: 5, currentCases: 3 }
};

// Updated initial patients data with more consistent information
const initialPatients = [
    { id: 'P-0487', name: 'Aarav Patel', age: 35, doctorType: 'Cardiologist', status: 'Critical' },
    { id: 'P-0486', name: 'Priya Sharma', age: 29, doctorType: 'Neurologist', status: 'Stable' },
    { id: 'P-0485', name: 'Vikram Singh', age: 60, doctorType: 'Pulmonologist', status: 'Active' },
    { id: 'P-0484', name: 'Ananya Verma', age: 40, doctorType: 'Oncologist', status: 'Under Observation' },
    { id: 'P-0483', name: 'Rohan Das', age: 51, doctorType: 'Orthopedic', status: 'Recovering' },
    { id: 'P-0482', name: 'Emily Wilson', age: 34, doctorType: 'Dermatologist', status: 'Active' },
    { id: 'P-0481', name: 'Robert Davis', age: 56, doctorType: 'Cardiologist', status: 'Critical' },
    { id: 'P-0480', name: 'Maria Rodriguez', age: 28, doctorType: 'Gynecologist', status: 'Active' },
    { id: 'P-0479', name: 'James Brown', age: 42, doctorType: 'Urologist', status: 'Stable' },
    { id: 'P-0478', name: 'Lisa Thompson', age: 67, doctorType: 'Geriatrician', status: 'Recovering' },
];

// Updated waiting list for new appointments with real dates
const waitingPatients = [
    { name: 'John Smith', preferredDate: DAY_AFTER_TOMORROW },
    { name: 'Sarah Johnson', preferredDate: DAY_AFTER_TOMORROW },
    { name: 'Michael Zhang', preferredDate: "Apr 21, 2025" },
    { name: 'Aisha Khan', preferredDate: "Apr 21, 2025" },
    { name: 'David Lee', preferredDate: "Apr 22, 2025" },
    { name: 'Emma Garcia', preferredDate: "Apr 22, 2025" },
    { name: 'Raj Patel', preferredDate: "Apr 23, 2025" },
    { name: 'Sofia Rossi', preferredDate: "Apr 23, 2025" }
];

const HospitalDashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stats, setStats] = useState({
        totalPatients: 0,
        availableDoctors: 0,
        availableRooms: 0,
        pendingAppointments: 0
    });
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [waitingList, setWaitingList] = useState(waitingPatients);

    useEffect(() => {
        // Simulate data loading
        const loadingTimer = setTimeout(() => {
            setStats({
                totalPatients: 1245,
                availableDoctors: 23,
                availableRooms: 42,
                pendingAppointments: 18
            });
            setIsLoaded(true);
        }, 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    // Handler for adding new patients - updated to use doctorType
    const handleAddPatient = (newPatient) => {
        // Generate a new ID based on the highest existing ID
        const maxIdNum = Math.max(...patients.map(p => parseInt(p.id.split('-')[1])));
        const newId = `P-${(maxIdNum + 1).toString().padStart(4, '0')}`;
        
        // Ensure the new patient has doctorType instead of doctor if needed
        const updatedPatient = {
            ...newPatient,
            id: newId,
            doctorType: newPatient.doctorType || newPatient.doctor
        };
        
        // If the old doctor field exists, remove it
        if (updatedPatient.doctor && updatedPatient.doctorType) {
            delete updatedPatient.doctor;
        }
        
        setPatients(prevPatients => [updatedPatient, ...prevPatients]);

        // Update total patients count
        setStats(prevStats => ({
            ...prevStats,
            totalPatients: prevStats.totalPatients + 1
        }));

        // Show a success message (could be replaced with a proper toast notification)
        alert(`Patient ${newPatient.name} has been added successfully!`);
    };

    // Handler for accepting an appointment
    const handleAcceptAppointment = (appointmentId) => {
        // For now, just show a confirmation message
        // In a real app, you'd likely update the database/state
        const appointment = appointments.find(app => app.id === appointmentId);
        if (appointment) {
            alert(`Appointment for ${appointment.patient} at ${appointment.time} on ${appointment.date} has been accepted!`);
        }
    };

    // Handler for rejecting an appointment
    const handleRejectAppointment = (appointmentId) => {
        // Find the index of the appointment to reject
        const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
        
        if (appointmentIndex !== -1) {
            // Create a copy of the current appointments
            const updatedAppointments = [...appointments];
            
            // Get the date of the rejected appointment for potential reuse
            const rejectedDate = updatedAppointments[appointmentIndex].date;
            
            // Remove the rejected appointment
            const rejectedAppointment = updatedAppointments.splice(appointmentIndex, 1)[0];
            
            // If there are waiting patients, add a new one in the last slot
            if (waitingList.length > 0) {
                // Get the next patient from waiting list
                const nextPatient = waitingList[0];
                const remainingWaitingList = waitingList.slice(1);
                
                // Find the next available time slot
                const lastTimeSlot = updatedAppointments.length > 0 ? 
                    timeSlots[updatedAppointments.length] : timeSlots[0];
                
                // Add new appointment at the end
                updatedAppointments.push({
                    id: Math.max(...appointments.map(a => a.id)) + 1,
                    patient: nextPatient.name,
                    time: lastTimeSlot || '04:30 PM', // Fallback time if no slot available
                    date: nextPatient.preferredDate
                });
                
                // Update waiting list
                setWaitingList(remainingWaitingList);
            }
            
            // Reorder time slots for the appointments on the same day as the rejected one
            const sameDay = updatedAppointments.filter(app => app.date === rejectedDate);
            const otherDays = updatedAppointments.filter(app => app.date !== rejectedDate);
            
            sameDay.forEach((app, index) => {
                app.time = timeSlots[index];
            });
            
            // Combine and sort by date and time
            const finalAppointments = [...sameDay, ...otherDays].sort((a, b) => {
                // Sort by date first
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                
                // If same date, sort by time
                const timeToMinutes = (time) => {
                    const [hour, minutesPart] = time.split(':');
                    const minutes = minutesPart.split(' ')[0];
                    const isPM = time.includes('PM');
                    
                    let hours = parseInt(hour, 10);
                    if (isPM && hours !== 12) hours += 12;
                    if (!isPM && hours === 12) hours = 0;
                    
                    return hours * 60 + parseInt(minutes, 10);
                };
                
                return timeToMinutes(a.time) - timeToMinutes(b.time);
            });
            
            // Update appointments state
            setAppointments(finalAppointments);
            
            // Show confirmation (in production, you'd use a toast notification)
            alert(`Appointment for ${rejectedAppointment.patient} has been rejected and schedule updated.`);
            
            // Update pending appointments count
            setStats(prevStats => ({
                ...prevStats,
                pendingAppointments: Math.max(0, prevStats.pendingAppointments - 1)
            }));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };

    // Tab navigation
    const renderTabContent = () => {
        return (
            <>
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <HospitalStatsCard
                        title="Total Patients"
                        value={stats.totalPatients}
                        icon="👥"
                        bgColor="bg-blue-100"
                    />
                    <HospitalStatsCard
                        title="Available Specialists"
                        value={stats.availableDoctors}
                        icon="👨‍⚕️"
                        bgColor="bg-green-100"
                    />
                    <HospitalStatsCard
                        title="Available Rooms"
                        value={stats.availableRooms}
                        icon="🏥"
                        bgColor="bg-yellow-100"
                    />
                    <HospitalStatsCard
                        title="Pending Appointments"
                        value={stats.pendingAppointments}
                        icon="⏰"
                        bgColor="bg-red-100"
                    />
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <motion.div variants={itemVariants}>
                        <PatientForm onAddPatient={handleAddPatient} />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <PatientList patients={patients} />
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <motion.div variants={itemVariants}>
                        <HospitalAppointments 
                            appointments={appointments} 
                            onAccept={handleAcceptAppointment}
                            onReject={handleRejectAppointment}
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <HospitalFacilities facilities={mockFacilities} />
                    </motion.div>
                </div>
            </>
        );
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
                            {renderTabContent()}
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

export default HospitalDashboard;