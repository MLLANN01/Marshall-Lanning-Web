import React from 'react'
import ExperienceCard from './ExperienceCard'

const Experience = () => (
  <div>
    <h2 className="text-3xl font-bold mb-4">Experience</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <ExperienceCard
      experience={{
        company: "UPS",
        title: "Manager, Software Engineering",
        product: "Network Planning and Optimization / AI Enablement",
        fromDate: "January 2023",
        toDate: "Present",
        companyLogo: "/icons/ups.png",
        description: "Developing responsive web applications using React.js and Next.js, implementing modern UI components and ensuring optimal performance across different devices and browsers. Creating user-centered design solutions, wireframes, and prototypes using Figma while building reusable React components with TypeScript.",
        achievements: [
          "Developed a generative AI assistant for transportation auditing, improving operational insight and reducing investigation time by 20%.",
          "Built autonomous agents using LangChain and Gemini to resolve yard and dispatching exceptions, resulting in $100M+ operational savings through back-office role consolidation.",
          "Developed a proprietary optimization algorithm for workforce scheduling across UPS feeder operations, reducing planning time and unlocking $75M+ in efficiency gains."
        ],
        technologies: [
          { label: "React.js", icon: "/icons/react.png" },
          { label: "Next.js", icon: "/icons/nextjs.png" },
          { label: "TypeScript", icon: "/icons/typescript.png" },
          { label: "Figma", icon: "/icons/figma.png" },
          { label: "UI/UX Design", icon: "/icons/uiux.png" }
        ]
      }}
    />
    <ExperienceCard
      experience={{
        company: "UPS",
        title: "Lead Software Engineer",
        product: "Yard Management",
        fromDate: "January 2023",
        toDate: "Present",
        companyLogo: "/icons/ups.png",
        description: "Developing responsive web applications using React.js and Next.js, implementing modern UI components and ensuring optimal performance across different devices and browsers. Creating user-centered design solutions, wireframes, and prototypes using Figma while building reusable React components with TypeScript.",
        achievements: [
          "Developed a generative AI assistant for transportation auditing, improving operational insight and reducing investigation time by 20%.",
          "Built autonomous agents using LangChain and Gemini to resolve yard and dispatching exceptions, resulting in $100M+ operational savings through back-office role consolidation.",
          "Developed a proprietary optimization algorithm for workforce scheduling across UPS feeder operations, reducing planning time and unlocking $75M+ in efficiency gains."
        ],
        technologies: [
          { label: "React.js", icon: "/icons/react.png" },
          { label: "Next.js", icon: "/icons/nextjs.png" },
          { label: "TypeScript", icon: "/icons/typescript.png" },
          { label: "Figma", icon: "/icons/figma.png" },
          { label: "UI/UX Design", icon: "/icons/uiux.png" }
        ]
      }}
    />
  </div>
)

export default Experience

