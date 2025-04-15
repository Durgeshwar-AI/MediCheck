import React from 'react'

function MenuTop({ data }) {
    return (
      <div className="p-4 border-b flex justify-between items-center">
        <span className="font-bold text-xl text-gray-800">{data}</span>
      </div>
    );
  }

export default MenuTop