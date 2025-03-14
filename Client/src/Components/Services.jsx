import React from 'react';
import { motion } from "framer-motion";
import logo from '../assets/logo.png'


const ServicesData = [
    {
        id: 1,
        title: "Service 1",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, corrupti.",
        icon: logo,
        bgColor: "bg-blue-100",
        delay: 0.5
    },
    {
        id: 2,
        title: "Service 2",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, corrupti.",
        icon: "icon-2",
        bgColor: "bg-green-100",
        delay: 0.7
    },
    {
        id: 3,
        title: "Service 3",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, corrupti.",
        icon: "icon-3",
        bgColor: "bg-yellow-100",
        delay: 0.9
    },
    {
        id: 4,
        title: "Service 4",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit, corrupti.",
        icon: "icon-4",
        bgColor: "bg-red-100",
        delay: 1.1
    },
];

const Services = () => {
    return (
        <>
            <div className="container mx-auto px-6 py-4 mb-3">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="font-bold mb-4 text-center text-amber-500 text-3xl">Why choose us?</h1>
                    <p className=" text-cyan text-center mb-4 italic text-xl">
                        We specialize in providing exceptional healthcare solutions.
                    </p>
                </motion.div>

                {/* Services Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:mx-0.5 mx-[15%]">
                    {ServicesData.map((service) => (
                        <motion.div
                            key={service.id}
                            className={`space-y-3.5 p-6 rounded-2xl shadow ${service.bgColor}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay, duration: 0.5 }}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
                                transition: { duration: 0.1, ease: "linear" }
                            }}
                        >
                            {/* Icon */}
                            <div className="icon-container flex justify-center ">
                                <img className='w-[70%] h-10 object-fit' src={service.icon} alt="" />
                            </div>
                            {/* Title */}
                            <p className="text-lg font-bold text-center">{service.title}</p>
                            {/* Description */}
                            <p className="text-sm text-center">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Services;