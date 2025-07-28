'use client'

import { useState, useEffect } from 'react'
import { FaGithub } from 'react-icons/fa'
import dynamic from 'next/dynamic'

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then(mod => mod.default || mod),
  { 
    ssr: false,
    loading: () => <div className="flex items-center justify-center py-8"><div className="text-gray-400">Loading calendar...</div></div>
  }
)

export default function GitHubContributions({ username }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Just set loading to false since we don't need to fetch user stats anymore
    setLoading(false)
  }, [])

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
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-400">Loading contributions...</div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-red-400">{error}</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="github-calendar-container">
              <GitHubCalendar username={username} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}