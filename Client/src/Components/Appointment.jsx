import { Calendar } from 'lucide-react';
import React from 'react'
import MenuTop from './MenuTop';

function Appointment() {
    return (
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <MenuTop data="Upcoming Appointments" />
        <div className="p-4">
          <Appointments
            date={15}
            month="Mar"
            name="Dr. Smith - Cardiology"
            time="9:00 AM"
            location="Memorial Hospital"
            type="checkup"
          />
          <Appointments 
            date={23}
            month="Mar"
            name="Blood Work"
            time="11:30 AM"
            location="City Lab Center"
            type="lab"
          />
          <div className="text-center pt-4">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              + Schedule New Appointment
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  function Appointments({ date, month, name, time, location, type }) {
    // Different background colors based on appointment type
    const bgColors = {
      checkup: "bg-blue-100",
      lab: "bg-purple-100",
      vaccination: "bg-green-100",
      specialist: "bg-orange-100"
    };
    
    return (
      <div className="grid grid-cols-5 gap-4 p-4 mb-3 border rounded-lg hover:shadow-md transition-shadow">
        <div className={`col-span-1 ${bgColors[type] || "bg-gray-100"} rounded-md p-2 flex flex-col items-center justify-center`}>
          <p className="text-2xl font-bold">{date}</p>
          <p className="text-sm">{month}</p>
        </div>
        <div className="col-span-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-lg">{name}</p>
              <p className="text-gray-600">{time} - {location}</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 rounded-md hover:bg-gray-100">
                <Calendar size={16} />
              </button>
              <button className="p-1 rounded-md hover:bg-gray-100">
                <span>⋮</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default Appointment