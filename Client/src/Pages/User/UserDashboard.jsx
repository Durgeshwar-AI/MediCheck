import React, { useState } from "react";
import Header from '../../Components/UserDashboardParts/Header';
import Welcome from "../../Components/UserDashboardParts/Welcome";
import QuickStats from "../../Components/UserDashboardParts/QuickStats";
import Metrics from "../../Components/UserDashboardParts/Metrics";
import Appointment from "../../Components/UserDashboardParts/Appointment";
import MedicalHistory from "../../Components/UserDashboardParts/MedicalHistory";
import HealthGoals from "../../Components/UserDashboardParts/HealthGoals";
import Medications from "../../Components/UserDashboardParts/Medications";
const UserDashboard = () => {
  const metrics = [
    { name: "Heart Rate", data: "72 bpm" },
    { name: "Oxygen Level", data: "98%" },
    { name: "Blood Pressure", data: "120/80" },
    { name: "Steps Today", data: "7,250" },
    { name: "Sleep Duration", data: "7h 20m" },
    { name: "Weight", data: "75 kg" },
  ];
  
  const [connected, setConnected] = useState(true); // For demo purposes

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Welcome />
        
        <QuickStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Metrics metrics={metrics} connected={connected} />
            <div className="mt-6">
              <HealthGoals />
            </div>
          </div>
          
          <div className="space-y-6">
            <Appointment/>
            <Medications />
            <MedicalHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
