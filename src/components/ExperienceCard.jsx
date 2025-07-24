import React from 'react'
import SkillCard from './SkillCard'

const ExperienceCard = ({ experience, className = '' }) => (
  <div className={`bg-stone-900 rounded-md shadow-md p-8 mb-8 max-w-8xl w-full mx-auto ${className}`}>
    <div className="flex flex-col md:flex-row gap-6 mb-6">
      {/* Company Logo and Divider */}
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center">
          <img src={experience.companyLogo} alt={experience.company} className="h-12 w-12 object-contain" />
        </div>
        <div className="hidden md:block h-full w-px bg-stone-700 mx-2 mt-4" />
      </div>
      {/* Title, Dates, Company, Product */}
      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-semibold mb-1">{experience.title}</h2>
            <span className="inline-flex items-center bg-stone-800 px-4 py-2 rounded text-gray-300 text-sm font-medium md:ml-4 md:mb-0 mb-2 md:mt-0 mt-2">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              {experience.fromDate} - {experience.toDate}
            </span>
          </div>
          {experience.product && (
            <div className="text-lg text-gray-400 mb-1 italic">{experience.product}</div>
          )}
          <div className="text-lg text-gray-400 mb-2 italic">{experience.company}</div>
        </div>
        {/* Description */}
        <p className="text-gray-300 mt-4">{experience.description}</p>
        {/* Key Achievements */}
        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mt-6">
            <span className="text-lg font-medium text-gray-200">Key Achievements</span>
            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300">
              {experience.achievements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    {/* Technologies */}
    <div className="mt-8">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-lg font-medium text-gray-200">Technologies</span>
        <hr className="flex-1 border-t border-stone-700" />
        <span className="text-xs text-gray-400 tracking-widest uppercase">{experience.technologies.length} Skills</span>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {experience.technologies.map((tech) => (
          <SkillCard key={tech.label} icon={tech.icon} label={tech.label} />
        ))}
      </div>
    </div>
  </div>
)

export default ExperienceCard