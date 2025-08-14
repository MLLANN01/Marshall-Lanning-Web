'use client'

import Image from 'next/image'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'

export default function ProjectCard({ project }) {
  const typeColors = {
    'Web': 'bg-blue-600',
    'Mobile': 'bg-indigo-600',
    'AI': 'bg-green-600',
    'Backend': 'bg-orange-600',
    'DevOps': 'bg-gray-600',
    'Desktop': 'bg-yellow-600',
  }

  const colorClass = typeColors[project.type] || 'bg-gray-600'

  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="relative h-56 overflow-hidden bg-gray-800">
        {project.image ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 relative">
            <Image 
              src={project.image} 
              alt={project.title}
              width={400}
              height={224}
              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500 p-4"
            />
            <div className="absolute inset-0 bg-gray-900/20 pointer-events-none" />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-800">
            <span className="text-gray-600 text-4xl font-light">{project.title[0]}</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-medium text-white rounded-full ${colorClass}`}>
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