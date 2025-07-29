import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Book Reviews - Marshall Lanning',
  description: 'Reviews and insights from books on technology, leadership, and innovation',
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-400">({rating}/5)</span>
    </div>
  )
}

async function getBookReviews() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/content/books/`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch book reviews');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error loading book reviews:', error);
    return [];
  }
}

export default async function BooksPage() {
  const books = await getBookReviews();

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-light text-white mb-4">Book Reviews</h1>
        <p className="text-xl text-gray-400 mb-12">
          Insights and reviews from books on technology, leadership, and innovation
        </p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {books.map((book) => (
            <Link
              key={book.slug}
              href={`/books/${book.slug}`}
              className="group block"
            >
              <article className="bg-gray-900/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex p-6">
                  {book.coverImage && (
                    <div className="relative w-24 h-36 flex-shrink-0 mr-4">
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} cover`}
                        fill
                        className="object-cover rounded group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h2 className="text-xl font-light text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {book.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                    <StarRating rating={book.rating} />
                    <time className="text-xs text-gray-500 block mt-2">
                      Read {new Date(book.dateRead).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long'
                      })}
                    </time>
                  </div>
                </div>
                <div className="px-6 pb-6">
                  <p className="text-gray-400 text-sm line-clamp-3">{book.excerpt}</p>
                  {book.recommendedFor && book.recommendedFor.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {book.recommendedFor.slice(0, 2).map((category) => (
                        <span
                          key={category}
                          className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
                        >
                          {category}
                        </span>
                      ))}
                      {book.recommendedFor.length > 2 && (
                        <span className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded">
                          +{book.recommendedFor.length - 2} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}