import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block group"
    >
      <article className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6 
                         hover:border-gray-700 hover:bg-gray-900/70 transition-all duration-300
                         hover:transform hover:scale-[1.02]">
        {post.featuredImage && (
          <div className="mb-4 overflow-hidden rounded-lg">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <time>{formatDate(post.date)}</time>
            {post.author && (
              <>
                <span>•</span>
                <span>{post.author}</span>
              </>
            )}
          </div>
          
          <h2 className="text-xl font-light text-white group-hover:text-gray-300 transition-colors">
            {post.title}
          </h2>
          
          <p className="text-gray-400 line-clamp-3">
            {post.excerpt}
          </p>
          
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
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
      </article>
    </Link>
  );
};

export default BlogCard;