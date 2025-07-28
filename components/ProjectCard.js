'use client'

import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

export default function ProjectCard({ project }) {
  const typeColors = {
    'Web': 'from-blue-600 to-cyan-600',
    'Mobile': 'from-purple-600 to-pink-600',
    'AI': 'from-green-600 to-emerald-600',
    'Backend': 'from-orange-600 to-red-600',
    'DevOps': 'from-gray-600 to-slate-600',
    'Desktop': 'from-yellow-600 to-orange-600',
  }

  const gradientClass = typeColors[project.type] || 'from-gray-600 to-gray-700'

  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {project.image ? (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative">
            <Image 
              src={project.image} 
              alt={project.title}
              width={400}
              height={224}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
            <span className="text-gray-600 text-4xl font-light">{project.title[0]}</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium text-white rounded-full bg-gradient-to-r ${gradientClass}`}>
            {project.type}
          </span>
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-light text-gray-100 group-hover:text-white transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <div
              key={index}
              className="flex items-center gap-1 px-2 py-1 bg-gray-800/50 rounded-md border border-gray-700/50"
            >
              {tech.icon && (
                <Image src={tech.icon} alt={tech.label} width={16} height={16} className="object-contain" />
              )}
              <span className="text-xs text-gray-400">{tech.label}</span>
            </div>
          ))}
        </div>
        
        <div className="flex gap-3 pt-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaGithub className="w-4 h-4" />
              <span className="text-sm">View Code</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
              <span className="text-sm">View Project</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}