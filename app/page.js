'use client'

import { useState } from 'react'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import VirtualBusinessCard from '../components/VirtualBusinessCard'

export default function Home() {
  const [showBusinessCard, setShowBusinessCard] = useState(false)

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="pt-4 md:-mt-20">
        <div className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6">
          <div className="text-center space-y-6 md:space-y-8 animate-fadeIn">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-light text-white leading-tight">
                Marshall <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">Lanning</span>
              </h1>
              <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
            </div>

            {/* Role & Description */}
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300">
                Software Engineering Leader
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto px-4 sm:px-0">                
                I drive technical strategy and lead teams that design and deliver systems built for scale, performance, and longevity. 
                My leadership empowers engineering teams to innovate, own outcomes, and align deeply with business goals.
              </p>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mt-8 md:mt-12">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 md:p-6 hover:border-gray-700 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-light text-blue-400 mb-2">Full Stack to Strategy</div>
                <div className="text-gray-300 text-xs md:text-sm">Backend, Data, Cloud, AI</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 md:p-6 hover:border-gray-700 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-light text-purple-400 mb-2">8+ Years Experience</div>
                <div className="text-gray-300 text-xs md:text-sm">Software Engineering</div>
              </div>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-4 md:p-6 hover:border-gray-700 transition-all duration-300">
                <div className="text-2xl md:text-3xl font-light text-green-400 mb-2">Driving Outcomes</div>
                <div className="text-gray-300 text-xs md:text-sm">Ops, Cost, Culture, Innovation</div>
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 md:pt-8 px-4 sm:px-0">
              <button 
                onClick={() => setShowBusinessCard(true)}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium text-sm md:text-base"
              >
                Get in Touch
              </button>
              <a 
                href="https://dwrim58cm70dp.cloudfront.net/marshall-lanning-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium text-sm md:text-base text-center"
              >
                View Resume
              </a>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gray-600 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Virtual Business Card Modal */}
      <VirtualBusinessCard 
        isOpen={showBusinessCard} 
        onClose={() => setShowBusinessCard(false)} 
      />

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 space-y-24">
        <section id="about" className="scroll-mt-20">
          <About />
        </section>        
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
      </div>
    </>
  )
}