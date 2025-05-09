import React from "react";
import Header from "../../Components/UserDashboardParts/Header";
import Welcome from "../../Components/UserDashboardParts/Welcome";
// import QuickStats from "../../Components/UserDashboardParts/QuickStats";
import Metrics from "../../Components/UserDashboardParts/Metrics";
import Appointment from "../../Components/UserDashboardParts/Appointment";
// import MedicalHistory from "../../Components/UserDashboardParts/MedicalHistory";
import HealthGoals from "../../Components/UserDashboardParts/HealthGoals";
import Medications from "../../Components/UserDashboardParts/Medications";
import UserSidebar from "../../Components/UserDashboardParts/UserSidebar";
import UserAiSection from "../../Components/UserDashboardParts/UserAiSection";
import { useHealth } from "../../hooks/useHealth";

const UserDashboard = () => {
  const {
      heartRate,
      oxygen,
      bp,
      steps,
      sleep,
    } = useHealth();
  const metrics = [
    { name: "Heart Rate", data: `${heartRate} bpm` },
    { name: "Oxygen Level", data: `${oxygen}%` },
    { name: "Blood Pressure", data: `${bp}` },
    { name: "Steps Today", data: `${steps}` },
    { name: "Sleep Duration", data: `${sleep} hours` },
  ];

  const { deviceConnected } = useHealth();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header on top */}
      <Header />

      {/* Flex container for Sidebar and Main Content */}
      <div className="flex">
        {/* Sidebar remains unchanged */}
        <UserSidebar />

        {/* Main Content */}
        <div className="flex-1 max-w-7xl mx-auto px-4 py-6">
          <Welcome />

          {/* Dashboard Items */}
          <main className="mt-6">
            {/* Grid Layout for Dashboard Widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-4">
              <div className="lg:col-span-2">
                <Metrics metrics={metrics} connected={deviceConnected} />
                <div className="mt-8">
                  <HealthGoals />
                </div>
              </div>

              <div className="space-y-2">
                <Appointment />
                <div className="mt-8"><Medications /></div>
                
                {/* If you wish to add or uncomment any additional widgets,
                    such as QuickStats or MedicalHistory, they can be added here */}
              </div>
            </div>
            <UserAiSection/>
          </main>

        </div>
      </div>
    </div>
  );
};

export default UserDashboard;