import React from 'react'

function QuickStats() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard 
          title="Days Active" 
          value="18/30" 
          icon={<ActivityIcon />}
          change="+3 from last month"
          positive={true}
        />
        <StatCard 
          title="Avg. Heart Rate" 
          value="68 bpm" 
          icon={<HeartRateIcon />}
          change="Within normal range"
          positive={true}
        />
        <StatCard 
          title="Last Blood Pressure" 
          value="120/80" 
          icon={<BPIcon />}
          change="Ideal range"
          positive={true}
        />
      </div>
    );
  }
  
  function StatCard({ title, value, icon, change, positive }) {
    return (
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div>{icon}</div>
        </div>
        <div className={`mt-2 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </div>
    );
  }
  
  function ActivityIcon() {
    return <div className="p-3 bg-green-100 text-green-500 rounded-full">📈</div>;
  }

  function HeartRateIcon() {
    return <div className="p-3 bg-red-100 text-red-500 rounded-full">❤️</div>;
  }

  function BPIcon() {
    return <div className="p-3 bg-purple-100 text-purple-500 rounded-full">BP</div>;
  }
  
export default QuickStats