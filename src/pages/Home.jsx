import React from 'react'
import Hero from '../components/Hero.jsx'
import About from '../components/About.jsx'
import Experience from '../components/Experience.jsx'
import Projects from '../components/Projects.jsx'
import Contact from '../components/Contact.jsx'
import Skills from '../components/Skills.jsx'

const Home = () => {
  return (
    <>
      <section id="hero" className="-mt-20">
        <Hero />
      </section>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24 space-y-24">
        <section id="about" className="scroll-mt-20">
          <About />
        </section>        
        <section id="experience" className="scroll-mt-20">
          <Experience />
        </section>
        <section id="projects" className="scroll-mt-20">
          <Projects />
        </section>
        <section id="skills" className="scroll-mt-20">
          <Skills />
        </section>
        <section id="contact" className="scroll-mt-20">
          <Contact />
        </section>
      </div>
    </>
  )
}

export default Home