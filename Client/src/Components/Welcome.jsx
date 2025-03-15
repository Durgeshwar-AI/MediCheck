import React from "react";

function Welcome() {
  return (
    <div className="grid grid-cols-4 m-8">
      <div className="col-span-3">
        <p className="font-bold text-2xl">Welcome back, John!</p>
        <p className="mt-2">Your health metrics are looking good today. Keep it up!</p>
      </div>
      <button className="border-2 rounded-3xl max-w-xs hover:bg-gray-200">View Full Dashboard</button>
    </div>
  );
}

export default Welcome;
