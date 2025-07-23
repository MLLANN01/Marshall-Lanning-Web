import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Skills from './components/Skills.jsx'
import './App.css'
import React from 'react'

function App() {
  return (
    <div className="bg-black text-white min-h-screen max-w-full">
      <Navbar />
      <main className="mx-[20vw] py-12 space-y-10">
        <section id="about">
          <About />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
    </div>
  )
}

export default App