import React, { useState } from 'react'
import MenuTop from './MenuTop';

function MedicalHistory() {
    return (
      <div className="bg-white border rounded-lg shadow-sm">
        <MenuTop data="Recent Medical History" />
        <div className="p-4">
          <Record 
            name="Annual Check-up"
            date="Feb 10, 2025"
            doctor="Dr. Johnson"
            notes="All vitals normal. Recommended more exercise."
          />
          <Record 
            name="Blood Test Results"
            date="Jan 25, 2025"
            doctor="Lab Services"
            notes="Cholesterol levels slightly elevated."
          />
          <div className="text-center pt-4">
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View Complete Medical History
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  function Record({ name, date, doctor, notes }) {
    const [expanded, setExpanded] = useState(false);
    
    return (
      <div className="border rounded-lg mb-3 overflow-hidden">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="font-medium">{name}</div>
          <div className="flex items-center">
            <span className="text-gray-500 mr-4">{date}</span>
            <span className={`transform transition-transform ${expanded ? 'rotate-180' : ''}`}>▼</span>
          </div>
        </div>
        
        {expanded && (
          <div className="p-4 bg-gray-50 border-t">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Provider</p>
                <p>{doctor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p>{date}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Notes</p>
              <p>{notes}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Download Report
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
  

export default MedicalHistory