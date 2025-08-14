import Link from 'next/link'
import Image from 'next/image'
import { fetchBookReviews } from '@/lib/content-utils'

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // ISR for performance

export const metadata = {
  title: 'Book Reviews | Marshall Lanning',
  description: 'Professional and technical book reviews by Marshall Lanning, focusing on software engineering, leadership, and business strategy.',
  keywords: 'book reviews, software engineering books, leadership books, technical books, business strategy',
  openGraph: {
    title: 'Book Reviews | Marshall Lanning',
    description: 'Professional and technical book reviews focusing on software engineering, leadership, and business strategy.',
    type: 'website',
    siteName: 'Marshall Lanning',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book Reviews | Marshall Lanning',
    description: 'Professional and technical book reviews focusing on software engineering, leadership, and business strategy.',
    creator: '@marshalllanning',
  },
}

async function getBookReviews() {
  try {
    return await fetchBookReviews()
  } catch (error) {
    console.error('Error loading book reviews:', error)
    return []
  }
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg ${
            i < rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-400 text-sm ml-2">({rating}/5)</span>
    </div>
  )
}

export default async function BooksPage() {
  const books = await getBookReviews()

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">
              Book Reviews
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Reviews of professional and technical books covering software engineering, 
              leadership, business strategy, and career development.
            </p>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No book reviews available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book) => (
                <Link
                  key={book.slug}
                  href={`/books/${book.slug}`}
                  className="group bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="aspect-[3/4] relative bg-gray-800">
                    {book.coverImage ? (
                      <Image
                        src={book.coverImage}
                        alt={`${book.title} book cover`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <div className="text-center p-6">
                          <div className="text-4xl mb-2">📚</div>
                          <div className="text-sm text-gray-500 font-medium">
                            {book.title}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {book.title}
                    </h2>
                    
                    <p className="text-gray-400 text-sm mb-3">
                      by {book.author}
                    </p>
                    
                    <StarRating rating={book.rating} />
                    
                    <p className="text-gray-300 text-sm mt-4 line-clamp-3">
                      {book.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                      <span className="text-xs text-gray-500">
                        Read {new Date(book.dateRead).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short'
                        })}
                      </span>
                      
                      {book.recommendedFor && book.recommendedFor.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {book.recommendedFor.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}