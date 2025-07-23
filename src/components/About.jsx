import React from 'react'

const About = () => (
  <div className="flex gap-8 items-start">
    <div className="flex-1">
      <h2 className="text-3xl font-bold mb-4">Marshall Lanning</h2>
      <hr className="border-t-2 border-gray-300 w-16 mb-4" />
      <p className="leading-relaxed mb-4">
        Software Engineering leader with expertise in full stack development, cloud platforms, real-time distributed systems, and AI integration.
        Proven ability to lead high-performing teams that deliver innovative solutions across enterprise-scale logistics operations.
        Passionate about aligning software delivery with measurable business outcomes and mentoring future leaders.
      </p>
      <h3 className="text-2xl font-bold mb-2 ml-8">Skills</h3>
      <ul className="list-disc list-inside mb-4 ml-8">
        <li>Full Stack Development</li>
        <li>Cloud Platforms</li>
        <li>Real-time Distributed Systems</li>
        <li>AI Integration</li>
      </ul>
    </div>
    <img src="/profile-square.png" alt="Marshall Lanning" className="w-100 h-100 object-cover" />
  </div>
)

export default About