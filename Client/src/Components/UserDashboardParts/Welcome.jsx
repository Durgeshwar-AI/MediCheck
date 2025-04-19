import React from "react";
import { useHealth } from "../../hooks/useHealth";
import BluetoothConnector from "../BluetoothConnector";

function Welcome() {
  const tokenData = localStorage.getItem("authToken");
  const { userName } = JSON.parse(tokenData);

  const { deviceConnected } = useHealth();

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
      <div className="">
        <div>
          <h1 className="font-bold text-2xl text-gray-800">
            Welcome back {userName}
          </h1>
          <div className="mt-2 text-gray-600">
            {deviceConnected ? (
              "Your health metrics are looking good today. Keep it up!"
            ) : (
              <>
                Connect your smartwatch to get started!
                <BluetoothConnector />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
