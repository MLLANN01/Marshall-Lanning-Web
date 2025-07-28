import React from 'react';
import BookList from '../components/Books/BookList';

const Books = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
          }}
        />
        
        <div className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-24 pb-16">
          <div className="animate-fadeIn">
            <div className="mb-8">
              <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">
                Reading List
              </p>
              <h1 className="text-4xl md:text-5xl font-light tracking-wide animate-slideInLeft">
                Book Reviews
              </h1>
            </div>
            <div className="w-full h-px bg-gradient-to-r from-gray-700 to-transparent mb-12 animate-slideInLeft" />
            
            <BookList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;