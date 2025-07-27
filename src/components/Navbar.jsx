import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  const navLinks = [
    { href: '#about', label: 'About', isHash: true },
    { href: '#experience', label: 'Experience', isHash: true },
    { href: '#projects', label: 'Projects', isHash: true },
    { href: '#skills', label: 'Skills', isHash: true },
    { href: '/blog', label: 'Blog', isHash: false },
    { href: '#contact', label: 'Contact', isHash: true },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-3">
            <img src="/icon/marshall/favicon.ico" alt="Logo" className="h-10 w-10 rounded-full" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light">Marshall Lanning</h2>
          </Link>
          
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              link.isHash && !isHomePage ? (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-light"
                >
                  {link.label}
                </Link>
              ) : link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-light"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-light"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="md:hidden border-t border-gray-800">
            <div className="py-2 space-y-1">
              {navLinks.map((link) => (
                link.isHash && !isHomePage ? (
                  <Link
                    key={link.href}
                    to={`/${link.href}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                ) : link.isHash ? (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-900 transition-colors duration-200 font-light"
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar