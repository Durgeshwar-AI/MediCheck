import React from 'react'
import MenuTop from '../MenuTop';

function Medications() {
    const meds = [
      { name: "Lisinopril", dosage: "10mg", schedule: "Daily - Morning", refill: "May 15" },
      { name: "Metformin", dosage: "500mg", schedule: "Twice daily", refill: "April 30" }
    ];
    
    return (
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <MenuTop data="Medications" />
        <div className="p-4">
          {meds.length > 0 ? (
            <div className="space-y-3">
              {meds.map(med => (
                <div key={med.name} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{med.name} {med.dosage}</div>
                    <div className="text-sm text-gray-500">{med.schedule}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">Refill by</div>
                    <div className="font-medium">{med.refill}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 my-6">No active medications</p>
          )}
          <div className="text-center pt-4">
            <button className="text-blue-600 hover:text-blue-800">
              Manage Medications
            </button>
          </div>
        </div>
      </div>
    );
  }
  

export default Medications