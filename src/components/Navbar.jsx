import React from 'react'

const Navbar = () => (
  <div className="flex items-center justify-between border-r shadow py-5 px-6 min-w-100">
    <div className="flex items-center gap-3">
        <img src="/icon/favicon.ico" alt="Logo" className="h-10 w-10 rounded-full" />
        <h1 className="text-2xl font-bold">Marshall Lanning</h1>
    </div>
    <nav className="flex gap-6 justify-end">
        <a href="#about" className="hover:text-teal-500 font-medium">About</a>
        <a href="#experience" className="hover:text-teal-500 font-medium">Experience</a>
        <a href="#projects" className="hover:text-teal-500 font-medium">Projects</a>
        <a href="#contact" className="hover:text-teal-500 font-medium">Contact</a>
    </nav>
  </div>
)

export default Navbar