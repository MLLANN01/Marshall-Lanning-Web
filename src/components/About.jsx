import React from 'react'

const About = () => (
  <div className="flex flex-col">
    <h2 className="text-3xl font-bold mb-2">About Me</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <div className="flex flex-col md:flex-row gap-8 items-start p-6">
      <div className="flex-shrink-0 flex justify-center md:justify-start">
        <img
          src="/profile-square.png"
          alt="Marshall Lanning"
          className="w-[15vw] h-[30vh] md:w-[15vw] md:h-[30vh] object-cover rounded-lg shadow-lg"
        />
      </div>
      <div className="flex-1">
        <p className="leading-relaxed mb-4">
          Software Engineering leader with expertise in full stack development, cloud platforms, real-time distributed systems, and AI integration.
          Proven ability to lead high-performing teams that deliver innovative solutions across enterprise-scale logistics operations.
          Passionate about aligning software delivery with measurable business outcomes and mentoring future leaders.
        </p>
      </div>
    </div>
  </div>
)

export default About