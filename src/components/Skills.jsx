import React from 'react'
import SkillCard from './SkillCard'

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { label: 'C#', icon: '/icon/etc/csharp.svg' },
      { label: 'Python', icon: '/icon/etc/python.svg' },
      { label: 'Java', icon: '/icon/etc/java.svg' },
      { label: 'C/C++', icon: '/icon/etc/cpp.svg' },
      { label: 'JavaScript', icon: '/icon/etc/javascript.svg' },
      { label: 'TypeScript', icon: '/icon/etc/typescript.svg' },
      { label: 'HTML', icon: '/icon/etc/html.svg' },
      { label: 'CSS', icon: '/icon/etc/css.svg' },
    ],
  },
  {
    title: 'Cloud',
    skills: [
      { label: 'Azure', icon: '/icon/etc/azure.svg' },
      { label: 'Google Cloud', icon: '/icon/etc/gcp.svg' },
      { label: 'AWS', icon: '/icon/etc/aws.svg' },
    ],
  },
  {
    title: 'Frontend Frameworks and Technologies',
    skills: [
      { label: 'Angular', icon: '/icon/etc/angular.svg' },
      { label: 'React', icon: '/icon/etc/react.svg' },
      { label: 'Vue', icon: '/icon/etc/vue.svg' },
    ],
  },
  {
    title: 'Backend Frameworks',
    skills: [
      { label: 'Node', icon: '/icon/etc/node.svg' },
      { label: 'Flask', icon: '/icon/etc/flask.svg' },
      { label: 'SpringBoot', icon: '/icon/etc/springboot.svg' },
      { label: '.NET', icon: '/icon/etc/dotnet.svg' },
    ],
  },
  {
    title: 'DataOps',
    skills: [
      { label: 'Apache Spark', icon: '/icon/etc/spark.svg' },
      { label: 'Kafka', icon: '/icon/etc/kafka.svg' },
      { label: 'ActiveMQ', icon: '/icon/etc/activemq.svg' },
      { label: 'Apache Camel', icon: '/icon/etc/apache-camel.svg' },
      { label: 'Azure Synapse', icon: '/icon/etc/azure-synapse.svg' },
      { label: 'BigQuery', icon: '/icon/etc/bigquery.svg' },
      { label: 'Grafana', icon: '/icon/etc/grafana.svg' },
      { label: 'PowerBI', icon: '/icon/etc/powerbi.svg' },
    ],
  },
  {
    title: 'Databases',
    skills: [
      { label: 'SQL Server', icon: '/icon/etc/sqlserver.svg' },
      { label: 'MySQL', icon: '/icon/etc/mysql.svg' },
      { label: 'Couchbase', icon: '/icon/etc/couchbase.svg' },
      { label: 'MongoDB', icon: '/icon/etc/mongodb.svg' },
      { label: 'DB2', icon: '/icon/etc/db2.svg' },
      { label: 'PostgreSQL', icon: '/icon/etc/postgresql.svg' },
    ],
  },
  {
    title: 'DevOps',
    skills: [
      { label: 'Terraform', icon: '/icon/etc/terraform.svg' },
      { label: 'Ansible', icon: '/icon/etc/ansible.svg' },
      { label: 'Azure DevOps', icon: '/icon/etc/azure-devops.svg' },
      { label: 'Jenkins', icon: '/icon/etc/jenkins.svg' },
      { label: 'Docker', icon: '/icon/etc/docker.svg' },
      { label: 'Kubernetes', icon: '/icon/etc/kubernetes.svg' },
      { label: 'Git', icon: '/icon/etc/git.svg' },
    ],
  },
  {
    title: 'AI',
    skills: [
      { label: 'LLM Fine Tuning', icon: '/icon/etc/openai.svg' },
      { label: 'Prompt Engineering', icon: '/icon/etc/prompt.svg' },
      { label: 'RAG', icon: '/icon/etc/rag.svg' },
      { label: 'Neural Networks', icon: '/icon/etc/neural.svg' },
      { label: 'LangChain', icon: '/icon/etc/langchain.svg' },
    ],
  },
  {
    title: 'Mobile Development',
    skills: [
      { label: 'Cordova', icon: '/icon/etc/cordova.svg' },
      { label: 'Xamarin', icon: '/icon/etc/xamarin.svg' },
      { label: 'Maui', icon: '/icon/etc/dotnet.svg' },
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