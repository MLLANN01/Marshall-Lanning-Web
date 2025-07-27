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
      { label: 'Tailwind', icon: '/icon/etc/tailwind.svg' },
      { label: 'Vite', icon: '/icon/etc/vite.svg' },
    ],
  },
  {
    title: 'Backend Frameworks and Technologies',
    skills: [
      { label: 'Node', icon: '/icon/etc/node.svg' },
      { label: 'Flask', icon: '/icon/etc/flask.svg' },
      { label: 'SpringBoot', icon: '/icon/etc/springboot.svg' },
      { label: '.NET', icon: '/icon/etc/dotnet.svg' },
      { label: 'GraphQL', icon: '/icon/etc/graphql.svg' },
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
      { label: 'Bash', icon: '/icon/etc/bash.svg' },
      { label: 'PowerShell', icon: '/icon/etc/powershell.svg' },
      { label: 'Linux', icon: '/icon/etc/linux.svg' },
      { label: 'Windows', icon: '/icon/etc/windows.svg' },
      { label: 'HashiCorp Vault', icon: '/icon/etc/vault.svg' },
      { label: 'OpenShift', icon: '/icon/etc/openshift.svg' },
      { label: 'Postman', icon: '/icon/etc/postman.svg' },
      { label: 'GitHub Actions', icon: '/icon/etc/actions.svg' },
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
  <div className="animate-fadeIn">
    <div className="mb-8">
      <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">Life Long Learning</p>
      <h2 className="text-4xl font-light tracking-wide animate-slideInLeft">Skills</h2>
    </div>
    <div className="w-full h-px bg-gradient-to-r from-gray-700 to-transparent mb-8 animate-slideInLeft" />
    <div className="space-y-10">
      {skillGroups.map((group, index) => (
        <div key={group.title} className="group animate-fadeIn" style={{ animationDelay: `${index * 100}ms` }}>
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-2xl font-light text-gray-200">{group.title}</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-700 via-gray-600/50 to-transparent" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {group.skills.map((skill) => (
                <SkillCard key={skill.label} icon={skill.icon} label={skill.label} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default Skills