const matter = require('gray-matter');
const { getTextFromS3, listObjectsFromS3, getCached, setCache, validateSlug } = require('./s3-client');

// Fetch all blog posts (metadata only for performance)
async function fetchBlogPosts() {
  const cacheKey = 'blog-posts-list';
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const objects = await listObjectsFromS3('blog/');
    const posts = [];

    for (const obj of objects) {
      if (obj.Key.endsWith('.md')) {
        const content = await getTextFromS3(obj.Key);
        const { data, content: markdown } = matter(content);
        
        const slug = obj.Key.replace('blog/', '').replace('.md', '');
        posts.push({
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          author: data.author || 'Marshall Lanning',
          excerpt: data.excerpt || markdown.substring(0, 150) + '...',
          tags: data.tags || [],
          featuredImage: data.featuredImage || null,
        });
      }
    }

    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setCache(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post with full content
async function fetchBlogPost(slug) {
  validateSlug(slug);
  
  const cacheKey = `blog-post-${slug}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const content = await getTextFromS3(`blog/${slug}.md`);
    const { data, content: markdown } = matter(content);
    
    const post = {
      slug,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      author: data.author || 'Marshall Lanning',
      excerpt: data.excerpt || markdown.substring(0, 150) + '...',
      tags: data.tags || [],
      featuredImage: data.featuredImage || null,
      content: markdown,
      ...data,
    };
    
    setCache(cacheKey, post);
    return post;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

// Fetch all book reviews (metadata only)
async function fetchBookReviews() {
  const cacheKey = 'book-reviews-list';
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const objects = await listObjectsFromS3('books/');
    const books = [];

    for (const obj of objects) {
      if (obj.Key.endsWith('.md')) {
        const content = await getTextFromS3(obj.Key);
        const { data, content: markdown } = matter(content);
        
        const slug = obj.Key.replace('books/', '').replace('.md', '');
        books.push({
          slug,
          title: data.title || 'Untitled',
          author: data.author || 'Unknown Author',
          dateRead: data.dateRead || new Date().toISOString(),
          rating: data.rating || 0,
          coverImage: data.coverImage || null,
          excerpt: data.excerpt || markdown.substring(0, 150) + '...',
          recommendedFor: data.recommendedFor || [],
        });
      }
    }

    // Sort by date read (newest first)
    books.sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead));
    
    setCache(cacheKey, books);
    return books;
  } catch (error) {
    console.error('Error fetching book reviews:', error);
    return [];
  }
}

// Fetch a single book review with full content
async function fetchBookReview(slug) {
  validateSlug(slug);
  
  const cacheKey = `book-review-${slug}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const content = await getTextFromS3(`books/${slug}.md`);
    const { data, content: markdown } = matter(content);
    
    const book = {
      slug,
      title: data.title || 'Untitled',
      author: data.author || 'Unknown Author',
      dateRead: data.dateRead || new Date().toISOString(),
      rating: data.rating || 0,
      coverImage: data.coverImage || null,
      purchaseLink: data.purchaseLink || null,
      excerpt: data.excerpt || markdown.substring(0, 150) + '...',
      recommendedFor: data.recommendedFor || [],
      keyTakeaways: data.keyTakeaways || [],
      content: markdown,
      ...data,
    };
    
    setCache(cacheKey, book);
    return book;
  } catch (error) {
    console.error(`Error fetching book review ${slug}:`, error);
    return null;
  }
}

// Helper to construct full image URLs
function getImageUrl(path) {
  if (!path) return null;
  
  // If it's already a full URL, return as is
  if (path.startsWith('http')) return path;
  
  // Otherwise, construct CloudFront URL
  const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN;
  if (cloudfrontDomain) {
    return `https://${cloudfrontDomain}/${path}`;
  }
  
  // Fallback to S3 direct URL
  return `https://${process.env.S3_BUCKET}.s3.${process.env.REGION}.amazonaws.com/${path}`;
}

module.exports = {
  fetchBlogPosts,
  fetchBlogPost,
  fetchBookReviews,
  fetchBookReview,
  getImageUrl
};