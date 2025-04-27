import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import HospitalHeader from '../../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../../Components/HospitalParts/HospitalSidebar';
// import HospitalStatsCard from '../../Components/HospitalParts/HospitalStatsCard';
import HospitalAppointments from '../../Components/HospitalParts/HospitalAppointments';
// import HospitalFacilities from '../../Components/HospitalParts/HospitalFacilities';
import PatientForm from '../../Components/HospitalParts/PatientForm';
import PatientList from '../../Components/HospitalParts/PatientList';
import BackToTopButton from '../../Components/FooterParts/BackToTopButton';

const getFormattedDate = (daysFromNow = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

const TODAY = new Date().toDateString();
const TOMORROW = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
const DAY_AFTER_TOMORROW = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toDateString();

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

const timeSlots = [
    '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '01:30 PM', 
    '02:15 PM', '03:00 PM', '03:45 PM', '04:30 PM'
];



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
    
    const [patients, setPatients] = useState(initialPatients);
    const [appointments, setAppointments] = useState(initialAppointments);
    const [waitingList, setWaitingList] = useState(waitingPatients);

    useEffect(() => {
        const loadingTimer = setTimeout(() => {
            // Simulate loading time
            setIsLoaded(true);
        }, 800);

        return () => clearTimeout(loadingTimer);
    }, []);

    const handleAddPatient = (newPatient) => {
        const maxIdNum = Math.max(...patients.map(p => parseInt(p.id.split('-')[1])));
        const newId = `P-${(maxIdNum + 1).toString().padStart(4, '0')}`;
        
        const updatedPatient = {
            ...newPatient,
            id: newId,
            doctorType: newPatient.doctorType || newPatient.doctor
        };
        
        if (updatedPatient.doctor && updatedPatient.doctorType) {
            delete updatedPatient.doctor;
        }
        
        setPatients(prevPatients => [updatedPatient, ...prevPatients]);

        // setStats(prevStats => ({
        //     ...prevStats,
        //     totalPatients: prevStats.totalPatients + 1
        // }));

        alert(`Patient ${newPatient.name} has been added successfully!`);
    };

    const handleAcceptAppointment = (appointmentId) => {
        const appointment = appointments.find(app => app.id === appointmentId);
        if (appointment) {
            alert(`Appointment for ${appointment.patient} at ${appointment.time} on ${appointment.date} has been accepted!`);
        }
    };

    const handleRejectAppointment = (appointmentId) => {
        const appointmentIndex = appointments.findIndex(app => app.id === appointmentId);
        
        if (appointmentIndex !== -1) {
            const updatedAppointments = [...appointments];
            const rejectedDate = updatedAppointments[appointmentIndex].date;
            const rejectedAppointment = updatedAppointments.splice(appointmentIndex, 1)[0];
            
            if (waitingList.length > 0) {
                const nextPatient = waitingList[0];
                const remainingWaitingList = waitingList.slice(1);
                
                const lastTimeSlot = updatedAppointments.length > 0 ? 
                    timeSlots[updatedAppointments.length] : timeSlots[0];
                
                updatedAppointments.push({
                    id: Math.max(...appointments.map(a => a.id)) + 1,
                    patient: nextPatient.name,
                    time: lastTimeSlot || '04:30 PM',
                    date: nextPatient.preferredDate
                });
                
                setWaitingList(remainingWaitingList);
            }
            
            const sameDay = updatedAppointments.filter(app => app.date === rejectedDate);
            const otherDays = updatedAppointments.filter(app => app.date !== rejectedDate);
            
            sameDay.forEach((app, index) => {
                app.time = timeSlots[index];
            });
            
            const finalAppointments = [...sameDay, ...otherDays].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                
                if (dateA < dateB) return -1;
                if (dateA > dateB) return 1;
                
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
            
            setAppointments(finalAppointments);
            alert(`Appointment for ${rejectedAppointment.patient} has been rejected and schedule updated.`);
            
            // setStats(prevStats => ({
            //     ...prevStats,
            //     pendingAppointments: Math.max(0, prevStats.pendingAppointments - 1)
            // }));
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

    const renderTabContent = () => {
        return (
            <>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                    <motion.div variants={itemVariants}>
                        <PatientForm onAddPatient={handleAddPatient} />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <PatientList patients={patients} />
                    </motion.div>
                </div>
                <div className=" gap-6 mt-6">
                    <motion.div variants={itemVariants}>
                        <HospitalAppointments 
                            appointments={appointments} 
                            onAccept={handleAcceptAppointment}
                            onReject={handleRejectAppointment}
                        />
                    </motion.div>

                    
                </div>
            </>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <HospitalHeader />

            <div className="flex ">
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
