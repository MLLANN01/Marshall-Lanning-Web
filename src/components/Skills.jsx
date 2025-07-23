import React from 'react'
import SkillCard from './SkillCard'

const Skills = () => (
  <div>
    <h2 className="text-3xl font-bold mb-4">Skills</h2>
    <hr className="border-t-2 border-gray-300 mb-6" />
    <div className="p-6">  
        <SkillCard icon="icon/192.png" label="M" />
    </div>
  </div>
)

export default Skills