import React from 'react'
import { FaLinkedin, FaGithub, FaSteam, FaSoundcloud, FaCalendarAlt, FaGift } from 'react-icons/fa'

const About = () => {
  const socialLinks = [
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/marshall-lanning', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: FaGithub, href: 'https://github.com/MLLANN01', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: FaSteam, href: 'https://steamcommunity.com/id/MGLL414/', label: 'Steam', color: 'hover:text-gray-300' },
    { icon: FaGift, href: 'https://www.amazon.com/hz/wishlist/ls/1KF52VBDNKRT4?ref_=wl_share', label: 'Amazon Wish List', color: 'hover:text-yellow-400' },
    { icon: FaSoundcloud, href: 'https://soundcloud.com/user-723992281', label: 'SoundCloud', color: 'hover:text-orange-400' },
    { icon: FaCalendarAlt, href: '#contact', label: 'Book a Meeting', color: 'hover:text-green-400' },
  ]

  return (
    <div className="flex flex-col animate-fadeIn">
      <div className="mb-8">
        <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">Get to know me</p>
        <h2 className="text-4xl font-light tracking-wide animate-slideInLeft">About Me</h2>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-gray-700 via-gray-600/30 to-transparent mb-8 animate-slideInLeft" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="flex justify-center lg:justify-start">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-60 transition duration-300"></div>
            <img
              src="/profile-square.png"
              alt="Marshall Lanning"
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-full lg:h-auto aspect-square object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-gray-300">
              Software Engineering leader with expertise in full stack development, cloud platforms, real-time distributed systems, and AI integration.
              Proven ability to lead high-performing teams that deliver innovative solutions across enterprise-scale logistics operations.
              Passionate about aligning software delivery with measurable business outcomes and mentoring future leaders.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              Outside of my professional life, I leverage my entrepreneurial spirit as a multi-instrumentalist that plays in performance level groups.
            </p>
          </div>
          
          <div className="mt-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
            <h3 className="text-xl font-light mb-4 text-gray-200">Connect With Me</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <a
                    key={index}
                    href={link.href}
                    aria-label={link.label}
                    className={`group relative p-3 bg-gray-800/50 rounded-lg border border-gray-700 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:scale-105 ${link.color}`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.label}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About