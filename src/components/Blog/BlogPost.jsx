import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import ShareButtons from '../ShareButtons';
import 'highlight.js/styles/github-dark.css';

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

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Link 
        to="/blog" 
        className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Blog
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-white mb-4 animate-fadeIn">
          {post.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <time>{formatDate(post.date)}</time>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author}</span>
            </>
          )}
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-gray-800 text-gray-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.featuredImage && (
        <div className="mb-12">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full rounded-lg"
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-light prose-headings:text-gray-200
                      prose-p:text-gray-300 prose-p:leading-relaxed
                      prose-a:text-white prose-a:underline prose-a:decoration-gray-500
                      prose-strong:text-white prose-strong:font-medium
                      prose-code:text-gray-300 prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                      prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800
                      prose-blockquote:border-gray-700 prose-blockquote:text-gray-400
                      prose-ul:text-gray-300 prose-ol:text-gray-300
                      prose-img:rounded-lg">
        <ReactMarkdown
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
  );
};

export default BlogPost;