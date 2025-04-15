import React from "react";
import { Trash2 } from "lucide-react";

function Medications() {
  const meds = [
    {
      id: 1,
      name: "Lisinopril",
      dosage: "10mg",
      schedule: "Daily - Morning",
      refill: "May 15",
    },
    {
      id: 2,
      name: "Metformin",
      dosage: "500mg",
      schedule: "Twice daily",
      refill: "April 30",
    },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-sm mb-6">
      <div className="p-4 border-b flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">Medications</span>
        <button className="text-blue-500 font-medium hover:text-blue-800">
          +Add
        </button>
      </div>
      <div className="p-4 h-[270px] overflow-y-auto">
        {meds.length > 0 ? (
          <div className="space-y-3">
            {meds.map((med) => (
              <div
                className="grid grid-cols-12 items-center justify-between w-full p-3 mb-3 border rounded-lg"
                key={med.id}
              >
                <div className="flex flex-col col-span-8">
                  <div className="font-medium">
                    {med.name} {med.dosage}
                  </div>
                  <div className="text-sm text-gray-500">{med.schedule}</div>
                </div>
                <div className="flex flex-col mr-4 col-span-3">
                  <div className="text-sm text-gray-500">Refill by</div>
                  <div className="font-medium">{med.refill}</div>
                </div>
                <button className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 my-6">
            No active medications
          </p>
        )}
      </div>
    </div>
  );
}

export default Medications;
