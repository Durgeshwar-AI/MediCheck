import React from "react";
import { useHealth } from "../hooks/useHealth";

function HeaderHome() {
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);

  const { deviceConnected } = useHealth();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">Hello {userName}</h1>
          <p className="mt-2 text-gray-600">
            Keep your daily health under control
          </p>
          <div className="mt-4 flex space-x-4">
            {deviceConnected ? (
              ""
            ) : (
              <button className="bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50">
                Connect Device
              </button>
            )}
          </div>
        </div>
        <button className="bg-white shadow-sm border py-2 px-6 rounded-full hover:bg-gray-50 transition-colors">
          View Full Dashboard
        </button>
      </div>
    </div>
  );
}

export default HeaderHome;
