'use client'

import Image from 'next/image'

export default function SkillCard({ icon, label, className = '' }) {
  return (
    <div className={`group relative p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:scale-105 hover:bg-gray-800/70 cursor-pointer ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-center w-16 h-16 bg-gray-900/50 rounded-lg group-hover:bg-gray-900/80 transition-colors duration-300">
            <Image src={icon} alt={label} width={40} height={40} className="object-contain group-hover:scale-110 transition-transform duration-300" />
          </div>
        </div>
        <span className="text-sm font-light text-gray-200 tracking-wide group-hover:text-white transition-colors duration-300">{label}</span>
      </div>
    </div>
  )
}