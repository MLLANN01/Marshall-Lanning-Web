import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ShareButtons from '../../../components/ShareButtons'
import { fetchBookReview } from '@/lib/content-utils'

// Force dynamic rendering for SSR
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // ISR for performance

async function getBookReview(slug) {
  try {
    return await fetchBookReview(slug);
  } catch (error) {
    console.error('Error loading book review:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const book = await getBookReview(slug);
  
  if (!book) {
    return {
      title: 'Book Review Not Found - Marshall Lanning',
    }
  }

  return {
    title: `${book.title} Review | Marshall Lanning`,
    description: book.excerpt,
    keywords: `${book.title}, ${book.author}, book review, ${book.recommendedFor?.join(', ')}`,
    authors: [{ name: 'Marshall Lanning' }],
    openGraph: {
      title: `${book.title} by ${book.author} - Review`,
      description: book.excerpt,
      type: 'article',
      publishedTime: book.dateRead,
      authors: ['Marshall Lanning'],
      siteName: 'Marshall Lanning',
      images: book.coverImage ? [{
        url: book.coverImage,
        width: 1200,
        height: 630,
        alt: `${book.title} book cover`,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${book.title} by ${book.author} - Review`,
      description: book.excerpt,
      images: book.coverImage ? [book.coverImage] : [],
      creator: '@marshalllanning',
    },
  }
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-2xl ${
            i < rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          ★
        </span>
      ))}
      <span className="text-gray-400 text-lg ml-2">({rating}/5)</span>
    </div>
  )
}

export default async function BookReview({ params }) {
  const { slug } = await params
  const book = await getBookReview(slug);

  if (!book) {
    notFound()
  }

  const currentUrl = `https://marshalllanning.com/books/${slug}`

  const components = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold text-white mt-12 mb-6 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-white mt-10 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium text-white mt-8 mb-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-300 leading-relaxed mb-6 text-lg">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 ml-4">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside text-gray-300 space-y-3 mb-6 ml-6">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-300 leading-relaxed pl-2">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-400 bg-gray-900/30 py-4 rounded-r">
        {children}
      </blockquote>
    ),
    hr: () => (
      <hr className="border-gray-700 my-12" />
    ),
    code: ({ children, className }) => {
      const isInline = !className
      if (isInline) {
        return (
          <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      return (
        <code className={`${className} block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto font-mono text-sm`}>
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 border border-gray-800">
        {children}
      </pre>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-400 hover:text-blue-300 underline transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <span className="block my-8">
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto block"
        />
        {alt && (
          <span className="block text-center text-sm text-gray-500 mt-3 italic">
            {alt}
          </span>
        )}
      </span>
    ),
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back to Books Link */}
          <Link 
            href="/books"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            ← Back to Book Reviews
          </Link>

          {/* Book Header */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {/* Book Cover */}
            <div className="md:w-64 flex-shrink-0">
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} book cover`}
                  width={256}
                  height={384}
                  className="w-full max-w-64 h-auto rounded-lg shadow-lg mx-auto md:mx-0"
                />
              ) : (
                <div className="w-full max-w-64 aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center mx-auto md:mx-0">
                  <div className="text-center p-6">
                    <div className="text-6xl mb-4">📚</div>
                    <div className="text-sm text-gray-500 font-medium">
                      {book.title}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Book Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {book.title}
              </h1>
              
              <p className="text-xl text-gray-400 mb-6">
                by {book.author}
              </p>
              
              <div className="mb-6">
                <StarRating rating={book.rating} />
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6">
                <span>
                  Read: {new Date(book.dateRead).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              {book.recommendedFor && book.recommendedFor.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Recommended for:</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.recommendedFor.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {book.keyTakeaways && book.keyTakeaways.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Takeaways</h3>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {book.keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="text-sm">{takeaway}</li>
                    ))}
                  </ul>
                </div>
              )}

              {book.purchaseLink && (
                <a
                  href={book.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  📖 Get this book
                  <span className="text-xs">↗</span>
                </a>
              )}
            </div>
          </div>

          {/* Review Content */}
          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {book.content}
            </ReactMarkdown>
          </article>

          <ShareButtons post={book} currentUrl={currentUrl} />
        </div>
      </div>
    </div>
  )
}