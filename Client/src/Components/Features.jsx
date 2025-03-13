import React from 'react';
import { motion } from "framer-motion";
import { FaPrescription, FaChartLine, FaUserMd, FaHospital, FaNotesMedical, FaHeartbeat } from 'react-icons/fa';

const Features = () => {
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const features = [
        {
            icon: <FaPrescription className="text-4xl text-blue-600 mb-4" />,
            title: "Digital Prescription Management",
            description: "Securely store and manage your medical prescriptions with advanced encryption and easy access."
        },
        {
            icon: <FaChartLine className="text-4xl text-blue-600 mb-4" />,
            title: "Health Analytics Dashboard",
            description: "Track vital signs, medications, and health patterns with comprehensive analytical tools."
        },
        {
            icon: <FaUserMd className="text-4xl text-blue-600 mb-4" />,
            title: "Physician Connect",
            description: "Schedule appointments and consult with qualified healthcare professionals in real-time."
        },
        {
            icon: <FaHospital className="text-4xl text-blue-600 mb-4" />,
            title: "Hospital Network Access",
            description: "Find and connect with nearby healthcare facilities with real-time availability updates."
        },
        {
            icon: <FaNotesMedical className="text-4xl text-blue-600 mb-4" />,
            title: "Symptom Assessment",
            description: "Advanced AI-powered symptom analysis for preliminary health guidance and recommendations."
        },
        {
            icon: <FaHeartbeat className="text-4xl text-blue-600 mb-4" />,
            title: "Vital Monitoring Integration",
            description: "Seamless integration with medical devices and smartwatches for continuous health monitoring."
        }
    ];

    return (
        <div className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
            {/* Heading Section */}
            <motion.div 
                className="max-w-4xl mx-auto text-center mb-16"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                    Advanced Healthcare Solutions
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Empowering healthcare professionals and patients with innovative digital tools 
                    for better health management and medical care coordination.
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-[10%] md:mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "50px" }}
                    >
                        <div className="text-center flex flex-col items-center">
                            {feature.icon}
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Features;
