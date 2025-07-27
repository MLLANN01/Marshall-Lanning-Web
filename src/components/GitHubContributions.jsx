import React from 'react'
import GitHubCalendar from 'react-github-calendar'
import { FaGithub } from 'react-icons/fa'

const GitHubContributions = ({ username }) => {
  const theme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  }

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8 hover:border-gray-700 transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaGithub className="w-6 h-6 text-gray-400" />
          <h3 className="text-2xl font-light text-gray-200">Building & Contributing</h3>
        </div>
        <a 
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gray-400 hover:text-gray-300 transition-colors duration-200"
        >
          @{username}
        </a>
      </div>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          blockSize={15}
          blockMargin={5}
          fontSize={14}
          theme={theme}
          style={{
            color: '#9ca3af',
          }}
        />
      </div>
    </div>
  )
}

export default GitHubContributions