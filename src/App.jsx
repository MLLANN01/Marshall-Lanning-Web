import Navbar from './components/Navbar.jsx'
import About from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import './App.css'
import React from 'react'

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="ml-56 max-w-3xl px-6 py-12 space-y-24">
        <section id="about">
          <About />
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