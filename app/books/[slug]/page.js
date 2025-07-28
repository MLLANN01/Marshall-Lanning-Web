import fs from 'fs/promises'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ShareButtons from '../../../components/ShareButtons'

export async function generateStaticParams() {
  const dataPath = path.join(process.cwd(), 'data', 'book-reviews.json')
  
  try {
    const data = await fs.readFile(dataPath, 'utf8')
    const books = JSON.parse(data)
    
    return books.map((book) => ({
      slug: book.slug,
    }))
  } catch (error) {
    console.error('Error loading book reviews for static generation:', error)
    return []
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const dataPath = path.join(process.cwd(), 'data', 'book-reviews.json')
  
  try {
    const data = await fs.readFile(dataPath, 'utf8')
    const books = JSON.parse(data)
    const book = books.find(b => b.slug === slug)
    
    if (!book) {
      return {
        title: 'Book Review Not Found - Marshall Lanning',
      }
    }

    return {
      title: `${book.title} Review - Marshall Lanning`,
      description: book.excerpt,
      openGraph: {
        title: `${book.title} - Book Review`,
        description: book.excerpt,
        type: 'article',
        authors: ['Marshall Lanning'],
        images: book.coverImage ? [{
          url: book.coverImage,
          width: 400,
          height: 600,
          alt: `${book.title} cover`,
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${book.title} - Book Review`,
        description: book.excerpt,
        images: book.coverImage ? [book.coverImage] : [],
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Book Review - Marshall Lanning',
    }
  }
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-xl ${
            star <= rating ? 'text-yellow-400' : 'text-gray-600'
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-gray-400">({rating}/5)</span>
    </div>
  )
}

export default async function BookReview({ params }) {
  const { slug } = await params
  const dataPath = path.join(process.cwd(), 'data', 'book-reviews.json')
  
  let book
  try {
    const data = await fs.readFile(dataPath, 'utf8')
    const books = JSON.parse(data)
    book = books.find(b => b.slug === slug)
  } catch (error) {
    console.error('Error loading book review:', error)
  }

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
      <h2 className="text-3xl font-semibold text-white mt-10 mb-5 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium text-white mt-8 mb-4">
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
      <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-6 ml-4">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-300 leading-relaxed">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-400 bg-gray-900/30 py-4 rounded-r">
        {children}
      </blockquote>
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
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            {book.coverImage && (
              <div className="relative w-48 h-72 flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover`}
                  fill
                  className="object-cover rounded shadow-lg"
                  priority
                />
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
                {book.title}
              </h1>
              <p className="text-xl text-gray-400 mb-4">by {book.author}</p>
              <StarRating rating={book.rating} />
              <div className="flex items-center gap-4 text-gray-400 text-sm mt-4">
                <time>
                  Read {new Date(book.dateRead).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long'
                  })}
                </time>
              </div>
              
              {book.purchaseLink && (
                <a
                  href={book.purchaseLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  <span>Get this book</span>
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
              
              {book.recommendedFor && book.recommendedFor.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Recommended for:</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.recommendedFor.map((category) => (
                      <span
                        key={category}
                        className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {book.keyTakeaways && book.keyTakeaways.length > 0 && (
            <div className="mb-12 p-6 bg-gray-900/50 rounded-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">Key Takeaways</h2>
              <ul className="space-y-2">
                {book.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {book.content}
            </ReactMarkdown>
          </article>

          <ShareButtons book={book} currentUrl={currentUrl} type="book" />
        </div>
      </div>
    </div>
  )
}