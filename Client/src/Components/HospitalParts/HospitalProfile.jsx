import React, { useState } from "react";
import { Hospital, Phone, MapPin, Settings } from "lucide-react";
import LogoutButton from "../LogoutButton";

const HospitalProfile = () => {
  
  // const { hospitalName } = JSON.parse(localStorage.getItem("authToken"));

  const [hospitalData, setHospitalData] = useState({
    hospitalName: "MediCare Hospital", 
    email: "contact@hospital.com",
    phone: "+91 12345 67890",
    location: "Kolkata, India",
    specialization: "Multi-Specialty Care",
    logo: "",
  });

  return (
    <div className="w-[400px] p-6 bg-white border rounded-xl shadow-md relative flex flex-col items-center z-30">
      {/* Settings button positioned at the top-right */}
      <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
        <Settings size={20} />
      </button>

      {/* Flex container for logo and hospital details */}
      <div className="flex items-center w-full space-x-4">
        {/* Logo section */}
        <div>
          {hospitalData.logo ? (
            <img
              className="w-20 h-20 rounded-full object-cover border-2 border-blue-200"
              src={hospitalData.logo}
              alt="Hospital Logo"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
              <Hospital size={40} className="text-blue-600" />
            </div>
          )}
        </div>

        {/* Hospital Info */}
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-800">
            {hospitalData.hospitalName}
          </h2>
          <p className="text-gray-600 text-sm">{hospitalData.specialization}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full mt-2">
        <h3 className="text-sm font-semibold text-gray-500">Contact</h3>
        <p className="text-gray-700">
          <Phone size={16} className="inline-block mr-2" />
          {hospitalData.phone}
        </p>
        <p className="text-gray-700">
          <MapPin size={16} className="inline-block mr-2" />
          {hospitalData.location}
        </p>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
};

export default HospitalProfile;