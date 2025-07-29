import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ShareButtons from '../../../components/ShareButtons'
import { fetchBlogPost } from '@/lib/content-utils'

// Static export configuration
export async function generateStaticParams() {
  try {
    const { fetchBlogPosts } = require('@/lib/content-utils');
    const posts = await fetchBlogPosts();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    throw error; // Let the build fail if environment variables are missing
  }
}

async function getBlogPost(slug) {
  try {
    return await fetchBlogPost(slug);
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found - Marshall Lanning',
    }
  }

  return {
    title: `${post.title} | Marshall Lanning`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author || 'Marshall Lanning' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Marshall Lanning'],
      siteName: 'Marshall Lanning',
      images: post.featuredImage ? [{
        url: post.featuredImage,
        width: 1200,
        height: 630,
        alt: post.title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      creator: '@marshalllanning',
    },
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params
  const post = await getBlogPost(slug);

  if (!post) {
    notFound()
  }

  const currentUrl = `https://marshalllanning.com/blog/${slug}`

  const components = {
    h1: ({ children }) => (
      <h1 className="text-5xl font-bold text-white mt-16 mb-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold text-white mt-12 mb-6 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-medium text-white mt-10 mb-4">
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
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span>By {post.author}</span>
              <span>•</span>
              <time>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <article className="prose prose-invert prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          <ShareButtons post={post} currentUrl={currentUrl} />
        </div>
      </div>
    </div>
  )
}