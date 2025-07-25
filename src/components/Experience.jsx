import React from 'react'
import ExperienceCard from './ExperienceCard'

const Experience = () => (
  <div>
    <h2 className="text-3xl font-bold mb-4">Experience</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <div className="p-6">
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Manager, Software Engineering",
          product: "Network Planning and Optimization / AI Enablement",
          fromDate: "January 2023",
          toDate: "Present",
          companyLogo: "/icon/etc/ups.svg",
          description: "Lead multiple agile teams focused on delivering AI-enabled solutions and enterprise-scale software. Oversee engineering strategy, team performance, and cross-functional collaboration to drive product delivery, platform modernization, and workforce optimization.",
          achievements: [
            "Developed a generative AI assistant for transportation auditing, improving operational insight and reducing investigation time by 20%.",
            "Built autonomous agents using LangChain and Gemini to resolve yard and dispatching exceptions, resulting in $100M+ operational savings through back-office role consolidation.",
            "Developed a proprietary optimization algorithm for workforce scheduling across UPS feeder operations, reducing planning time and unlocking $75M+ in efficiency gains."
          ],
          technologies: [
            { label: "Gemini", icon: "/icon/etc/gemini.svg" },
            { label: "LangChain", icon: "/icon/etc/langchain.svg" },
            { label: "Python", icon: "/icon/etc/python.svg" },
            { label: "Angular", icon: "/icon/etc/angular.svg" },
            { label: "GCP", icon: "/icon/etc/gcp.svg" }
          ]
        }}
      />
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Lead Software Engineer",
          product: "Yard Management",
          fromDate: "Jul 2021",
          toDate: "Jan 2023",
          companyLogo: "/icon/etc/ups.svg",
          description: "Guided technical design and delivery of yard management systems, leading efforts in system automation, DevOps transformation, and real-time data integration. Served as a hands-on leader fostering engineering excellence and operational scalability.",
          achievements: [
            "Engineered real-time ETL pipelines to ingest edge/IOT and system data into BigQuery, accelerating planning decisions and data accessibility.",
            "Designed an automated yard control system that replaced 80% of manual routing decisions; design currently under patent review.",
            "Championed DevOps modernization efforts that improved deployment frequency and cut cycle time by 40%.",
            "Mentored cross-level engineers and embedded best practices in CI/CD and infrastructure automation."
          ],
          technologies: [
            { label: "Dotnet", icon: "/icon/etc/dotnet.svg" },
            { label: "Angular", icon: "/icon/etc/angular.svg" },
            { label: "GCP", icon: "/icon/etc/gcp.svg" },
            { label: "BigQuery", icon: "/icon/etc/bigquery.svg" },
            { label: "Terraform", icon: "/icon/etc/terraform.svg" }
          ]
        }}
      />
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Senior Software Engineer",
          product: "Smart Trailer and TMS Assets",
          fromDate: "Jun 2020",
          toDate: "Jul 2021",
          companyLogo: "/icon/etc/ups.svg",
          description: "Developed geospatial and telematics-based solutions to improve trailer tracking and asset management. Contributed to architecture decisions, code quality, and mentoring initiatives across engineering teams.",
          achievements: [
            "Developed a real time GPS event ETL pipeline to track trailer assets, enhancing visibility and improving asset utilization.",
            "Developed geospatial software to view trailer locations and on-site asset management.",
            "Advocated for emerging technologies and mentored junior engineers in design, architecture, and best practices."
          ],
          technologies: [
            { label: "Java", icon: "/icon/etc/java.svg" },
            { label: "Kafka", icon: "/icon/etc/kafka.svg" },
            { label: "Grafana", icon: "/icon/etc/grafana.svg" },
            { label: "Docker", icon: "/icon/etc/docker.svg" },
            { label: "Couchbase", icon: "/icon/etc/couchbase.svg" }
          ]
        }}
      />
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Intermediate Software Engineer",
          product: "Hub and Gateway Integration",
          fromDate: "Jan 2020",
          toDate: "Jun 2020",
          companyLogo: "/icon/etc/ups.svg",
          description: "Built backend services and data pipelines to support air cargo and flight operations. Collaborated with cross-functional teams to integrate gateway and dispatch systems, supporting flight planning and compliance workflows.",
          achievements: [
            "Delivered Java based ETL pipelines to optimize cargo placement on UPS aircraft, increasing load efficiency and contributing to improved on-time flight percentages.",
            "Provided key integrations between gateway systems and airline operations using FAA-compliant services."
          ],
          technologies: [
            { label: "Java", icon: "/icon/etc/java.svg" },
            { label: "Azure", icon: "/icon/etc/azure.svg" },
            { label: "SQL Server", icon: "/icon/etc/sqlserver.svg" },
            { label: "SpringBoot", icon: "/icon/etc/springboot.svg" },
            { label: "Azure DevOps", icon: "/icon/etc/azure-devops.svg" }
          ]
        }}
      />
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Software Engineer",
          product: "Flight Integration",
          fromDate: "Jun 2019",
          toDate: "Jan 2020",
          companyLogo: "/icon/etc/ups.svg",
          description: "Supported development of scalable APIs and microservices for transportation systems. Gained foundational experience in enterprise software development, agile practices, and systems integration.",
          achievements: [
            "Led backend development for a digital load manifest system, eliminating manual FAA documentation processes, reducing pre-flight time and manual error.",
            "Gained hands-on experience in OAuth, containerization, and Agile team delivery."
          ],
          technologies: [
            { label: "Apache Camel", icon: "/icon/etc/apache-camel.svg" },
            { label: "Docker", icon: "/icon/etc/docker.svg" },
            { label: "Dotnet", icon: "/icon/etc/dotnet.svg" },
            { label: "Jenkins", icon: "/icon/etc/jenkins.svg" },
            { label: "ActiveMQ", icon: "/icon/etc/activemq.svg" }
          ]
        }}
      />
      <ExperienceCard
        experience={{
          company: "UPS",
          title: "Engineering Co-Op",
          product: "Transportation Integration Systems",
          fromDate: "Jan 2017",
          toDate: "Jun 2019",
          companyLogo: "/icon/etc/ups.svg",
          description: "Supported development of scalable APIs and microservices for transportation systems. Gained foundational experience in enterprise software development, agile practices, and systems integration.",
          achievements: [
            "Developed REST APIs and microservices in Java to support scalable load tracking and automated dispatch integration."
          ],
          technologies: [
            { label: "HTML", icon: "/icon/etc/css.svg" },
            { label: "CSS", icon: "/icon/etc/html.svg" },
            { label: "Node", icon: "/icon/etc/node.svg" },
            { label: "Java", icon: "/icon/etc/java.svg" },
            { label: "Git", icon: "/icon/etc/git.svg" }
          ]
        }}
      />
    </div>
  </div>
)

export default Experience

