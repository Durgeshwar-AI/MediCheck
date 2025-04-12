import React from 'react'
import MenuTop from '../MenuTop';

function HealthGoals() {
    const goals = [
      { name: "Daily Steps", target: "10,000", current: "7,250", percent: 72 },
      { name: "Water Intake", target: "8 glasses", current: "5 glasses", percent: 62 },
      { name: "Sleep", target: "8 hours", current: "6.5 hours", percent: 81 }
    ];
    
    return (
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <MenuTop data="Health Goals" />
        <div className="p-4 space-y-4">
          {goals.map(goal => (
            <div key={goal.name} className="mb-4">
              <div className="flex justify-between mb-1">
                <span>{goal.name}</span>
                <span>{goal.current} / {goal.target}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${goal.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
          <div className="pt-2 text-center">
            <button className="text-blue-600 hover:text-blue-800">
              Set New Goal
            </button>
          </div>
        </div>
      </div>
    );
  }

export default HealthGoals