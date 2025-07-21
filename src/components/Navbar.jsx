import React from 'react'

const Navbar = () => (
  <aside className="fixed top-0 left-0 h-full w-56 bg-white border-r shadow flex flex-col items-center py-10">
    <div className="mb-10">
      <h1 className="text-2xl font-bold text-gray-900">Marshall Lanning</h1>
      <p className="text-sm text-gray-500">Software Engineering Leader</p>
    </div>
    <nav className="flex flex-col gap-6 mt-10">
      <a href="#about" className="hover:text-teal-500 font-medium">About</a>
      <a href="#experience" className="hover:text-teal-500 font-medium">Experience</a>
      <a href="#projects" className="hover:text-teal-500 font-medium">Projects</a>
      <a href="#contact" className="hover:text-teal-500 font-medium">Contact</a>
    </nav>
  </aside>
)

export default Navbar