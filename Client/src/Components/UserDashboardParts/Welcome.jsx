import { Calendar } from "lucide-react";
import React from "react";
import { useHealth } from "../../hooks/useHealth";

function Welcome() {
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);

  const {deviceConnected} = useHealth()

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            Welcome back {userName}
          </h1>
          <p className="mt-2 text-gray-600">
            {deviceConnected?"Your health metrics are looking good today. Keep it up!":"Connect your smartwatch to get started!"}
          </p>
          <div className="mt-4 flex space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
              <Calendar size={18} className="mr-2" />
              Schedule Appointment
            </button>
            <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
              Connect Device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
