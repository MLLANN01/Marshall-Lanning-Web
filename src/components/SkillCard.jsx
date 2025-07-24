import React from 'react'

const SkillCard = ({ icon, label, className = '' }) => (
  <div className={`bg-stone-900 rounded-md flex flex-col items-center justify-center w-40 h-44 shadow-md ${className}`}>
    <div className="flex items-center justify-center w-24 h-24 bg-stone-800 rounded mb-4">
      <img src={icon} alt={label} className="h-12 w-12 object-contain" />
    </div>
    <span className="text-base font-semibold text-gray-100 tracking-wide">{label}</span>
  </div>
)

export default SkillCard