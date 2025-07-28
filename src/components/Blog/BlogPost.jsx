import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ShareButtons from '../ShareButtons';
import 'highlight.js/styles/github-dark.css';
import './BlogPost.css';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await fetch('/content/blog-posts.json');
        if (!response.ok) {
          throw new Error('Failed to load blog posts');
        }
        const data = await response.json();
        const foundPost = data.find(p => p.slug === slug);
        
        if (!foundPost) {
          throw new Error('Post not found');
        }
        
        setPost(foundPost);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  // Custom components for ReactMarkdown
  const components = {
    h1: ({children}) => (
      <h1 className="text-5xl font-bold text-white mt-16 mb-8 leading-tight">
        {children}
      </h1>
    ),
    h2: ({children}) => (
      <h2 className="text-3xl font-bold text-white mt-16 mb-8 leading-tight tracking-tight">
        {children}
      </h2>
    ),
    h3: ({children}) => (
      <h3 className="text-2xl font-semibold text-gray-100 mt-12 mb-6 leading-tight">
        {children}
      </h3>
    ),
    p: ({children}) => (
      <p className="text-xl text-gray-300 mb-8 leading-loose">
        {children}
      </p>
    ),
    ul: ({children}) => (
      <ul className="list-disc text-gray-300 mb-8 space-y-2 ml-6">
        {children}
      </ul>
    ),
    ol: ({children}) => (
      <ol className="list-decimal text-gray-300 mb-8 space-y-2 ml-6">
        {children}
      </ol>
    ),
    li: ({children}) => (
      <li className="text-lg leading-relaxed pl-2">
        <span className="text-gray-300">{children}</span>
      </li>
    ),
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-gray-600 pl-6 my-8 italic text-gray-400 text-xl">
        {children}
      </blockquote>
    ),
    code: ({inline, children}) => {
      if (inline) {
        return (
          <code className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-sm font-mono">
            {children}
          </code>
        );
      }
      return (
        <code className="block">
          {children}
        </code>
      );
    },
    pre: ({children}) => (
      <pre className="bg-gray-900 border border-gray-800 rounded-lg p-4 overflow-x-auto mb-6 shadow-lg">
        {children}
      </pre>
    ),
    a: ({href, children}) => (
      <a 
        href={href} 
        className="text-white underline decoration-gray-500 underline-offset-4 hover:decoration-white transition-colors"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({children}) => (
      <strong className="text-white font-semibold">
        {children}
      </strong>
    ),
    em: ({children}) => (
      <em className="text-gray-200 italic">
        {children}
      </em>
    ),
    hr: () => (
      <hr className="border-gray-700 my-12 w-1/3 mx-auto" />
    ),
    img: ({src, alt}) => (
      <figure className="my-12">
        <img 
          src={src} 
          alt={alt || ''} 
          className="w-full rounded-lg shadow-2xl border border-gray-800"
        />
        {alt && (
          <figcaption className="text-center text-gray-500 text-sm mt-4 italic">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-700 rounded w-96"></div>
          <div className="h-4 bg-gray-700 rounded w-48"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <Link to="/blog" className="text-white hover:text-gray-300 underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  const pageUrl = `${window.location.origin}/blog/${post.slug}`;
  const imageUrl = post.featuredImage 
    ? `${window.location.origin}${post.featuredImage}`
    : `${window.location.origin}/profile-square.png`;

  return (
    <div className="min-h-screen bg-black relative">
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{post.title} | Marshall Lanning</title>
        <meta name="description" content={post.excerpt} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Marshall Lanning" />
        <meta property="article:author" content={post.author} />
        <meta property="article:published_time" content={new Date(post.date).toISOString()} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={imageUrl} />
        
        {/* LinkedIn specific */}
        <meta property="og:image:alt" content={post.title} />
        <meta name="author" content={post.author} />
        
        {/* Additional tags for better sharing */}
        <link rel="canonical" href={pageUrl} />
      </Helmet>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-gray-800/20"></div>
      
    <article className="relative max-w-4xl mx-auto px-6 py-16">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Blog
      </Link>

      <header className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight animate-fadeIn">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed font-light">
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-4 text-gray-500 mb-8 text-lg">
          <time className="font-medium">{formatDate(post.date)}</time>
          <span>·</span>
          <span className="reading-time">{calculateReadingTime(post.content)}</span>
          {post.author && (
            <>
              <span>·</span>
              <span className="font-medium">{post.author}</span>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-4 py-2 bg-gray-800/50 text-gray-400 rounded-full hover:bg-gray-800 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="article-content">
        <ReactMarkdown
          components={components}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-800 space-y-8">
        <ShareButtons 
          url={`/blog/${post.slug}`}
          title={post.title}
          type="blog post"
        />
        
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
        >
          ← Back to all posts
        </Link>
      </footer>
    </article>
    </div>
  );
};

export default BlogPost;