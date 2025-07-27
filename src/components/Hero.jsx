import React from 'react'

const Hero = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative hero-pattern pt-20">
      <div className="text-center space-y-6 animate-fadeIn max-w-5xl mx-auto px-4">
        <div className="space-y-2">
          <p className="text-lg sm:text-xl text-gray-500 font-light tracking-widest uppercase animate-slideInLeft">Welcome</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-gray-100 leading-tight">
            I'm Marshall Lanning
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mt-2">
            <span className="text-gray-400">Engineering</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 font-normal">Leader</span>
          </h2>
        </div>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Transforming complex challenges into elegant solutions through innovative technology and collaborative leadership
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <a
            href="#about"
            className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
          >
            <span className="relative z-10">Explore My Journey</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 rounded-lg hover:border-gray-600 hover:bg-gray-800/70 hover:text-white transition-all duration-300"
          >
            Let's Connect
          </a>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-pulse-slow">
        <a href="#about" className="group">
          <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default Hero