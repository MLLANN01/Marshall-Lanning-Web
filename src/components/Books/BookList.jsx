import React, { useState, useEffect } from 'react';
import BookCard from './BookCard';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch('/content/book-reviews.json');
        if (!response.ok) {
          throw new Error('Failed to load book reviews');
        }
        const data = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadBooks();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(books.map(book => book.category))];

  // Filter books
  const filteredBooks = filter === 'all' 
    ? books 
    : books.filter(book => book.category === filter);

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-48"></div>
          <div className="h-4 bg-gray-700 rounded w-36"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error loading book reviews: {error}</p>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">No book reviews yet. Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setFilter(category);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              filter === category
                ? 'bg-white text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentBooks.map((book) => (
          <BookCard key={book.slug} book={book} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 pt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-gray-400 rounded 
                     hover:bg-gray-700 hover:text-white transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-1">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`w-10 h-10 rounded transition-colors ${
                  currentPage === index + 1
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-gray-400 rounded 
                     hover:bg-gray-700 hover:text-white transition-colors
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BookList;