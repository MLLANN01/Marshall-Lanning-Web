import React from 'react'
import SkillCard from './SkillCard'

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { label: 'C#', icon: '/icons/csharp.png' },
      { label: 'Python', icon: '/icons/python.png' },
      { label: 'Java', icon: '/icons/java.png' },
      { label: 'C', icon: '/icons/c.png' },
      { label: 'C++', icon: '/icons/cpp.png' },
      { label: 'JavaScript', icon: '/icons/javascript.png' },
      { label: 'TypeScript', icon: '/icons/typescript.png' },
      { label: 'HTML', icon: '/icons/html.png' },
      { label: 'CSS', icon: '/icons/css.png' },
    ],
  },
  {
    title: 'Frontend',
    skills: [
      { label: 'Angular', icon: '/icons/angular.png' },
      { label: 'React', icon: '/icons/react.png' },
      { label: 'Vue', icon: '/icons/vue.png' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { label: 'Node', icon: '/icons/node.png' },
      { label: 'Flask', icon: '/icons/flask.png' },
      { label: 'SpringBoot', icon: '/icons/springboot.png' },
      { label: '.NET', icon: '/icons/dotnet.png' },
    ],
  },
  {
    title: 'DataOps',
    skills: [
      { label: 'Apache Spark', icon: '/icons/spark.png' },
      { label: 'Kafka', icon: '/icons/kafka.png' },
      { label: 'ActiveMQ', icon: '/icons/activemq.png' },
      { label: 'Azure Synapse', icon: '/icons/azure-synapse.png' },
      { label: 'BigQuery', icon: '/icons/bigquery.png' },
      { label: 'Grafana', icon: '/icons/grafana.png' },
      { label: 'PowerBI', icon: '/icons/powerbi.png' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { label: 'SQL Server', icon: '/icons/sqlserver.png' },
      { label: 'MySQL', icon: '/icons/mysql.png' },
      { label: 'Couchbase', icon: '/icons/couchbase.png' },
      { label: 'MongoDB', icon: '/icons/mongodb.png' },
      { label: 'DB2', icon: '/icons/db2.png' },
      { label: 'PostgreSQL', icon: '/icons/postgresql.png' },
    ],
  },
  {
    title: 'DevOps',
    skills: [
      { label: 'Terraform', icon: '/icons/terraform.png' },
      { label: 'Ansible', icon: '/icons/ansible.png' },
      { label: 'Azure DevOps', icon: '/icons/azure-devops.png' },
      { label: 'Jenkins', icon: '/icons/jenkins.png' },
      { label: 'Docker', icon: '/icons/docker.png' },
      { label: 'Kubernetes', icon: '/icons/kubernetes.png' },
    ],
  },
  {
    title: 'Cloud',
    skills: [
      { label: 'Azure', icon: '/icons/azure.png' },
      { label: 'Google Cloud', icon: '/icons/gcp.png' },
      { label: 'AWS', icon: '/icons/aws.png' },
    ],
  },
  {
    title: 'AI',
    skills: [
      { label: 'LLM Fine Tuning', icon: '/icons/llm.png' },
      { label: 'Prompt Engineering', icon: '/icons/prompt.png' },
      { label: 'RAG', icon: '/icons/rag.png' },
      { label: 'Neural Networks', icon: '/icons/neural.png' },
      { label: 'LangChain', icon: '/icons/langchain.png' },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { label: 'Cordova', icon: '/icons/cordova.png' },
      { label: 'Xamarin', icon: '/icons/xamarin.png' },
      { label: 'Maui', icon: '/icons/maui.png' },
    ],
  },
]


const Skills = () => (
  <div>
    <h2 className="text-3xl font-bold mb-4">Skills</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <div className="space-y-8">
      {skillGroups.map((group) => (
        <div key={group.title} className="flex flex-col items-center w-full">
          <h3 className="text-xl font-semibold mb-2">{group.title}</h3>
          <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl">
            {group.skills.map((skill) => (
              <SkillCard key={skill.label} icon={skill.icon} label={skill.label} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Skills