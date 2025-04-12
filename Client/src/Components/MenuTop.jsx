import React from 'react'

function MenuTop({ data }) {
    return (
      <div className="p-4 border-b flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">{data}</span>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View All
        </button>
      </div>
    );
  }

export default MenuTop