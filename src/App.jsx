import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './components/Blog/BlogPost.jsx'
import Books from './pages/Books.jsx'
import BookReview from './components/Books/BookReview.jsx'
import './App.css'
import React from 'react'

function App() {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
        }}
      />
      <Navbar />
      <main className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:slug" element={<BookReview />} />
        </Routes>
      </main>
    </div>
  )
}

export default App