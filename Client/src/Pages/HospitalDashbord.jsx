import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Import components
import HospitalHeader from '../Components/HospitalParts/HospitalHeader';
import HospitalSidebar from '../Components/HospitalParts/HospitalSidebar';
import HospitalStatsCard from '../Components/HospitalParts/HospitalStatsCard';
import HospitalAppointments from '../Components/HospitalParts/HospitalAppointments';
import HospitalFacilities from '../Components/HospitalParts/HospitalFacilities';
import PatientForm from '../Components/HospitalParts/PatientForm';
import PatientList from '../Components/HospitalParts/PatientList';
import BackToTopButton from '../Components/FooterParts/BackToTopButton'

const mockAppointments = [
    { id: 1, patient: 'Emily Wilson', time: '09:30 AM' },
    { id: 2, patient: 'Robert Davis', time: '10:15 AM' },
    { id: 3, patient: 'Maria Rodriguez', time: '11:00 AM' },
    { id: 4, patient: 'James Brown', time: '11:45 AM' },
    { id: 5, patient: 'Lisa Thompson', time: '01:30 PM' }
];

const mockFacilities = {
    generalWard: { available: 18, occupied: 32, percentFull: 60 },
    icu: { available: 3, occupied: 7, percentFull: 70 },
    operatingRooms: { available: 2, inUse: 3, percentInUse: 60 },
    emergency: { onDuty: 5, currentCases: 3 }
};

// Initial mock patients data
const initialPatients = [
    { id: 'P-0487', name: 'Aarav Patel', age: 35, doctor: 'Dr. Mehta', status: 'Critical' },
    { id: 'P-0486', name: 'Priya Sharma', age: 29, doctor: 'Dr. Reddy', status: 'Stable' },
    { id: 'P-0485', name: 'Vikram Singh', age: 60, doctor: 'Dr. Rao', status: 'Active' },
    { id: 'P-0484', name: 'Ananya Verma', age: 40, doctor: 'Dr. Banerjee', status: 'Under Observation' },
    { id: 'P-0483', name: 'Rohan Das', age: 51, doctor: 'Dr. Iyer', status: 'Recovering' },
    { id: 'P-0482', name: 'Emily Wilson', age: 34, doctor: 'Dr. Smith', status: 'Active' },
    { id: 'P-0481', name: 'Robert Davis', age: 56, doctor: 'Dr. Johnson', status: 'Critical' },
    { id: 'P-0480', name: 'Maria Rodriguez', age: 28, doctor: 'Dr. Chen', status: 'Active' },
    { id: 'P-0479', name: 'James Brown', age: 42, doctor: 'Dr. Wilson', status: 'Stable' },
    { id: 'P-0478', name: 'Lisa Thompson', age: 67, doctor: 'Dr. Garcia', status: 'Recovering' },

];

export default function HospitalDashboard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stats, setStats] = useState({
        totalPatients: 0,
        availableDoctors: 0,
        availableRooms: 0,
        pendingAppointments: 0
    });
    const [patients, setPatients] = useState(initialPatients);

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

    // Handler for adding new patients
    const handleAddPatient = (newPatient) => {
        setPatients(prevPatients => [newPatient, ...prevPatients]);

        // Update total patients count
        setStats(prevStats => ({
            ...prevStats,
            totalPatients: prevStats.totalPatients + 1
        }));

        // Show a success message (could be replaced with a proper toast notification)
        alert(`Patient ${newPatient.name} has been added successfully!`);
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
                        title="Available Doctors"
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
                <div className="grid grid-cols-1 lg:grid-cols-2  gap-6">
                    <motion.div variants={itemVariants}>
                        <PatientForm onAddPatient={handleAddPatient} />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <PatientList patients={patients} />
                    </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                    <motion.div variants={itemVariants}>
                        <HospitalAppointments appointments={mockAppointments} />
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
                        >{renderTabContent()}
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
}