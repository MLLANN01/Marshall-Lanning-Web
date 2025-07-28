import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ShareButtons from '../ShareButtons';
import 'highlight.js/styles/github-dark.css';

const BookReview = () => {
  const { slug } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBook = async () => {
      try {
        const response = await fetch('/content/book-reviews.json');
        if (!response.ok) {
          throw new Error('Failed to load book reviews');
        }
        const data = await response.json();
        const foundBook = data.find(b => b.slug === slug);
        
        if (!foundBook) {
          throw new Error('Book review not found');
        }
        
        setBook(foundBook);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadBook();
  }, [slug]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-700 rounded w-48"></div>
          <div className="h-4 bg-gray-700 rounded w-36"></div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">
            {error || 'Book review not found'}
          </p>
          <Link to="/books" className="text-blue-400 hover:text-blue-300">
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link to="/books" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="aspect-[3/4] relative overflow-hidden bg-gray-800 rounded-lg mb-4">
              {book.coverImage ? (
                <img
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-20 h-20 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                </div>
              )}
            </div>
            
            {book.purchaseLink && (
              <a
                href={book.purchaseLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors"
              >
                Buy This Book
              </a>
            )}
          </div>

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-4xl font-bold">{book.title}</h1>
            <p className="text-xl text-gray-400">by {book.author}</p>
            
            <div className="flex items-center gap-4">
              {renderStars(book.rating)}
              <span className="text-gray-500">
                Read on {new Date(book.dateRead).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>

            {book.category && (
              <div>
                <span className="inline-block px-3 py-1 bg-gray-800 text-gray-300 rounded">
                  {book.category}
                </span>
              </div>
            )}

            {book.tags && book.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <span key={index} className="text-sm text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {book.keyTakeaways && book.keyTakeaways.length > 0 && (
              <div className="bg-gray-900 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Key Takeaways</h3>
                <ul className="list-disc list-inside space-y-1">
                  {book.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="text-gray-300">{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}

            {book.recommendedFor && book.recommendedFor.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Recommended For</h3>
                <p className="text-gray-300">{book.recommendedFor.join(', ')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {book.content}
          </ReactMarkdown>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-800 space-y-8">
          <ShareButtons 
            url={`/books/${book.slug}`}
            title={`"${book.title}" by ${book.author} - Book Review`}
            type="book review"
          />
          
          <Link 
            to="/books" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            ← Back to all books
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default BookReview;