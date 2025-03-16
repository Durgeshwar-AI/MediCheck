import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppleWatch from "../assets/AppleWatch.svg";  

const ConnectSmart = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        // Update the clock every second
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format the time as HH:MM (using locale options)
    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    // State management
    const [isConnected, setIsConnected] = useState(false);
    const [isPairing, setIsPairing] = useState(false);
    const [currentDevice, setCurrentDevice] = useState(null);
    const [showDeviceList, setShowDeviceList] = useState(false);

    // List of compatible devices
    const compatibleDevices = [
        { id: 1, name: 'Apple Watch Series 4-8', platform: 'iOS', icon: '⌚' },
        { id: 2, name: 'Samsung Galaxy Watch 4/5', platform: 'Android', icon: '⌚' },
        { id: 3, name: 'Fitbit Versa 2/3/4', platform: 'Cross-platform', icon: '⌚' },
        { id: 4, name: 'Garmin Venu/Forerunner', platform: 'Cross-platform', icon: '⌚' },
        { id: 5, name: 'Xiaomi Mi Band 7/8', platform: 'Android', icon: '⌚' },
    ];

    // Connected features
    const connectedFeatures = [
        {
            id: 1,
            name: 'Activity Tracking',
            description: 'Steps, distance, calories',
            icon: '✓'
        },
        {
            id: 2,
            name: 'Notifications',
            description: 'Messages, calls, alerts',
            icon: '✓'
        },
        {
            id: 3,
            name: 'Health Monitoring',
            description: 'Heart rate, sleep quality',
            icon: '✓'
        },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.3,
                duration: 0.5
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

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    // Handle connect button click
    const handleConnect = () => {
        setIsPairing(true);

        // Simulate connection process
        setTimeout(() => {
            setIsPairing(false);
            setIsConnected(true);
        }, 2000);
    };

    // Handle device selection
    const selectDevice = (device) => {
        setCurrentDevice(device);
        setShowDeviceList(false);
    };

    // Configure settings
    const configureSettings = () => {
        alert("Opening settings configuration panel");
        // You would implement the settings panel here
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <motion.div
                className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="p-6 border-b border-gray-200">
                    <motion.h1
                        className="text-2xl font-bold text-center text-gray-800"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Connect Your Smart Watch
                    </motion.h1>
                </div>

                <div className="md:flex">
                    {/* Left side - Connection status and instructions */}
                    <div className="md:w-1/2 p-6 border-r border-gray-200">
                        <motion.div
                            className="flex flex-col items-center mb-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div
                                className="relative w-32 h-32 mb-4 flex items-center justify-center"
                                variants={itemVariants}
                            >
                                <div className="relative">
                                    {/* Smartwatch photo with real-time overlay */}
                                    <motion.div
                                        className="w-40 h-40 relative"  // increased size container with relative positioning
                                        animate={isPairing ? "pulse" : {}}
                                        variants={pulseVariants}
                                    >
                                        <img
                                            src={AppleWatch}
                                            alt="Apple Watch"
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Overlay the real time on top of the image */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <span className="bg-black bg-opacity-50 rounded px-1 text-white text-sm font-mono">
                                                {formattedTime}
                                            </span>
                                        </div>
                                    </motion.div>


                                    {/* Success checkmark */}
                                    {isConnected && (
                                        <motion.div
                                            className="absolute -bottom-2 -right-3 bg-gradient-to-tr from-green-500 to-green-400 p-2 rounded-full shadow-md ring-2 ring-white"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: 0.3, type: "spring", stiffness: 500, damping: 20 }}
                                        >
                                            <motion.svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-6 h-6"
                                                style={{ color: "#fff" }}
                                                initial={{ rotate: -15 }}
                                                animate={{ rotate: 0 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                            >
                                                <path d="M21.801 10A10 10 0 1 1 17 3.335" />
                                                <path d="m8 11 2 3L22 5" />
                                            </motion.svg>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>

                            <motion.p
                                className="text-lg font-medium text-center text-gray-700"
                                variants={itemVariants}
                            >
                                {isPairing ? "Connecting..." :
                                    isConnected ? "Successfully connected!" : "Ready to connect"}
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-6"
                        >
                            <motion.h2
                                className="text-lg font-semibold mb-4 text-gray-700"
                                variants={itemVariants}
                            >
                                Setup Instructions
                            </motion.h2>

                            <motion.ol className="space-y-3" variants={containerVariants}>
                                <motion.li
                                    className="flex items-center gap-3"
                                    variants={itemVariants}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 text-sm">1</span>
                                    Enable Bluetooth on your device
                                </motion.li>
                                <motion.li
                                    className="flex items-center gap-3"
                                    variants={itemVariants}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 text-sm">2</span>
                                    Make sure your watch is nearby
                                </motion.li>
                                <motion.li
                                    className="flex items-center gap-3"
                                    variants={itemVariants}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 text-sm">3</span>
                                    Put your watch in pairing mode
                                </motion.li>
                                <motion.li
                                    className="flex items-center gap-3"
                                    variants={itemVariants}
                                >
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 text-sm">4</span>
                                    Click the Connect button below
                                </motion.li>
                            </motion.ol>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <button
                                className={`w-full py-3 px-4 rounded-full flex items-center justify-center gap-2 text-white font-medium transition-all ${isConnected
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-blue-500 hover:bg-blue-600"
                                    }`}
                                onClick={handleConnect}
                                disabled={isPairing || isConnected}
                            >
                                {isPairing ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        <span>Connecting...</span>
                                    </>
                                ) : isConnected ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>Connected</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                            <g id="SVGRepo_iconCarrier"> 
                                                <path d="M7 17L17 7L12 2V22L17 17L7 7" 
                                                    stroke="#ffffff" 
                                                    strokeWidth="2" 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round">
                                                </path> 
                                            </g>
                                        </svg>
                                        <span>Connect</span>
                                    </>
                                )}
                            </button>
                        </motion.div>
                    </div>

                    {/* Right side - Device selection and features */}
                    <div className="md:w-1/2 p-6">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="mb-6"
                        >
                            <motion.div
                                className="flex items-center gap-2 mb-4"
                                variants={itemVariants}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h2 className="text-lg font-semibold text-gray-700">Compatible Devices</h2>
                            </motion.div>

                            <motion.div className="space-y-2">
                                {compatibleDevices.map((device) => (
                                    <motion.div
                                        key={device.id}
                                        className={`p-3 border rounded-lg cursor-pointer transition-all ${currentDevice?.id === device.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-blue-300'
                                            }`}
                                        onClick={() => selectDevice(device)}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xl">{device.icon}</span>
                                                <div>
                                                    <p className="font-medium text-gray-800">{device.name}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs px-2 py-1 rounded ${device.platform === 'iOS'
                                                ? 'bg-gray-100'
                                                : device.platform === 'Android'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-purple-100 text-purple-800'
                                                }`}>
                                                {device.platform}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.p
                                className="text-sm text-center mt-3 text-gray-500"
                                variants={itemVariants}
                            >
                                Don't see your device? <a href="#" className="text-blue-500 hover:underline">Check full list</a>
                            </motion.p>
                        </motion.div>

                        {/* Connected features section - only visible when connected */}
                        <AnimatePresence>
                            {isConnected && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-green-50 rounded-lg p-4 overflow-hidden"
                                >
                                    <motion.div
                                        className="flex items-center gap-2 mb-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h3 className="font-semibold text-gray-800">Connected Features</h3>
                                    </motion.div>

                                    <motion.div
                                        className="space-y-3"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {connectedFeatures.map((feature, index) => (
                                            <motion.div
                                                key={feature.id}
                                                className="flex items-start gap-3"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + (index * 0.2) }}
                                            >
                                                <div className="mt-1 flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{feature.name}</p>
                                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>

                                    <motion.div
                                        className="mt-4"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 1.2 }}
                                    >
                                        <button
                                            className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md flex items-center justify-center gap-2 transition-colors"
                                            onClick={configureSettings}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Configure Watch Settings
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Animated notification when device connects */}
                        <AnimatePresence>
                            {isConnected && currentDevice && (
                                <motion.div
                                    className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                                    initial={{ opacity: 0, y: 20, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: "auto" }}
                                    exit={{ opacity: 0, y: -20, height: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 p-2 bg-blue-100 rounded-full text-blue-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Device Information</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Connected to {currentDevice.name} ({currentDevice.platform})
                                            </p>
                                            <div className="mt-3 flex gap-2 text-sm">
                                                <motion.button
                                                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Device Info
                                                </motion.button>
                                                <motion.button
                                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    Disconnect
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer section with status indicators */}
                <motion.div
                    className="border-t border-gray-200 p-4 bg-gray-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className="text-sm text-gray-600">Bluetooth {isConnected ? 'Connected' : 'Disconnected'}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                <span className="text-sm text-gray-600">Data Sync {isConnected ? 'Active' : 'Inactive'}</span>
                            </div>
                        </div>

                        {isConnected && (
                            <motion.div
                                className="text-sm text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            >
                                Last updated: Just now
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ConnectSmart;