import React from 'react'
import GitHubContributions from './GitHubContributions'
import ProjectCard from './ProjectCard'

const Projects = () => {
  // Replace with your GitHub username
  const githubUsername = 'MLLANN01'
  
  // Sample projects data - replace with your actual projects
  const projects = [
    {
      id: 1,
      title: 'Marshall Lanning Resume Site',
      type: 'Web',
      description: 'Reactive web application showcasing my professional portfolio and resume.',
      image: '/projects/resume-site.png',
      technologies: [
        { label: 'React', icon: '/icon/etc/react.svg' },
        { label: 'Tailwind', icon: '/icon/etc/tailwind.svg' },
        { label: 'AWS', icon: '/icon/etc/aws.svg' },
        { label: 'Docker', icon: '/icon/etc/docker.svg' },
      ],
      githubUrl: 'https://github.com/MLLANN01/Marshall-Lanning-Web',
      liveUrl: 'https://marshalllanning.com',
    },
    {
      id: 2,
      title: 'Smart Stakes',
      type: 'AI',
      description: 'Analytics platform leveraging machine learning for predictive insights and reporting on horse racing data. ',
      image: '/projects/smart-stakes.png',
      technologies: [
        { label: 'AWS', icon: '/icon/etc/aws.svg' },
        { label: 'Python', icon: '/icon/etc/python.svg' },
        { label: 'Kafka', icon: '/icon/etc/kafka.svg' },
        { label: 'LangChain', icon: '/icon/etc/langchain.svg' },
      ]
    },
    {
      id: 3,
      title: 'Generati0n',
      type: 'AI',
      description: 'AI based content generation platform for social media and marketing automation.',
      image: '/projects/generati0n.png',
      technologies: [
        { label: 'Java', icon: '/icon/etc/java.svg' },
        { label: 'Docker', icon: '/icon/etc/docker.svg' },
        { label: 'Prompt Engineering', icon: '/icon/etc/prompt.svg' },
        { label: 'LLM Fine Tuning', icon: '/icon/etc/openai.svg' },
      ]
    },
    {
      id: 4,
      title: 'Big Stomp Mobile App',
      type: 'Mobile',
      description: 'Mobile application POC for local music festival with event scheduling and artist profiles integration.',
      image: '/projects/big-stomp.png',
      technologies: [
        { label: 'React', icon: '/icon/etc/react.svg' },
        { label: 'Cordova', icon: '/icon/etc/cordova.svg' },
        { label: 'JavaScript', icon: '/icon/etc/javascript.svg' },
      ]
    },
    {
      id: 5,
      title: 'Portfolio Optimizer',
      type: 'Desktop',
      description: 'Desktop application that analyzes historical stock data to optimize investment portfolions using a genetic algorithm.',
      image: '/projects/chart.png',
      technologies: [
        { label: 'Dotnet', icon: '/icon/etc/dotnet.svg' },
        { label: 'C#', icon: '/icon/etc/csharp.svg' },
        { label: 'Azure', icon: '/icon/etc/azure.svg' }
      ],
      githubUrl: 'https://github.com/MLLANN01/PortfolioOptimization'
    },
    {
      id: 6,
      title: 'Clinical Trials',
      type: 'Mobile',
      description: 'Mobile application used to discover clinical trial offerings from the University of Louisville.',
      image: '/projects/uofl.png',
      technologies: [
        { label: 'Xamarin', icon: '/icon/etc/xamarin.svg' },
        { label: 'SQL Server', icon: '/icon/etc/sqlserver.svg' },
        { label: 'C#', icon: '/icon/etc/csharp.svg' },
        { label: 'Azure', icon: '/icon/etc/azure.svg' }
      ],
      liveUrl: 'https://apps.apple.com/us/app/uofl-clinical-trials-mobile/id1586566178'
    }
  ]

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">My Innovative Spirit</p>
        <h2 className="text-4xl font-light tracking-wide animate-slideInLeft">Projects</h2>
      </div>
      <div className="w-full h-px bg-gradient-to-r from-gray-700 to-transparent mb-12 animate-slideInLeft" />
      
      {/* GitHub Contributions */}
      <div className="mb-12">
        <GitHubContributions username={githubUsername} />
      </div>
      
      {/* Featured Projects */}
      <div className="mb-8">
        <h3 className="text-2xl font-light text-gray-200 mb-6">Featured Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects