import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <Link 
      to={`/books/${book.slug}`}
      className="block bg-gray-900 rounded-lg overflow-hidden hover:bg-gray-800 
                 transition-all duration-300 group border border-gray-800 
                 hover:border-gray-700"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gray-800">
        {book.coverImage ? (
          <img
            src={book.coverImage}
            alt={`${book.title} cover`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-20 h-20 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-white transition-colors">
            {book.title}
          </h3>
          <p className="text-sm text-gray-400">by {book.author}</p>
        </div>
        
        <div className="flex items-center justify-between">
          {renderStars(book.rating)}
          <span className="text-xs text-gray-500">{book.dateRead && new Date(book.dateRead).getFullYear()}</span>
        </div>
        
        {book.category && (
          <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-400 rounded">
            {book.category}
          </span>
        )}
        
        <p className="text-sm text-gray-400 line-clamp-3">
          {book.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default BookCard;