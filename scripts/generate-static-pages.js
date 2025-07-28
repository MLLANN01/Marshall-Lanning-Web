import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateStaticPages() {
  try {
    // Read blog posts
    const blogPostsPath = path.join(__dirname, '..', 'content', 'blog-posts.json');
    const blogPosts = JSON.parse(await fs.readFile(blogPostsPath, 'utf8'));
    
    // Ensure directory exists
    const staticDir = path.join(__dirname, '..', 'dist', 'blog');
    await fs.mkdir(staticDir, { recursive: true });
    
    // Generate static HTML for each blog post
    for (const post of blogPosts) {
      const postDir = path.join(staticDir, post.slug);
      await fs.mkdir(postDir, { recursive: true });
      
      const imageUrl = post.featuredImage 
        ? `https://www.marshalllanning.com${post.featuredImage}`
        : 'https://www.marshalllanning.com/profile-square.png';
      
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Marshall Lanning</title>
    <meta name="description" content="${post.excerpt}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://www.marshalllanning.com/blog/${post.slug}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="Marshall Lanning">
    <meta property="article:author" content="${post.author}">
    <meta property="article:published_time" content="${new Date(post.date).toISOString()}">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:url" content="https://www.marshalllanning.com/blog/${post.slug}">
    <meta name="twitter:title" content="${post.title}">
    <meta name="twitter:description" content="${post.excerpt}">
    <meta name="twitter:image" content="${imageUrl}">
    
    <!-- LinkedIn specific -->
    <meta property="og:image:alt" content="${post.title}">
    <meta name="author" content="${post.author}">
    
    <!-- Canonical -->
    <link rel="canonical" href="https://www.marshalllanning.com/blog/${post.slug}">
    
    <!-- Redirect for real users (not crawlers) -->
    <script>
      // Check if user agent is a crawler
      const crawlers = /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|slack/i;
      if (!crawlers.test(navigator.userAgent)) {
        window.location.replace("https://www.marshalllanning.com/blog/${post.slug}");
      }
    </script>
    <noscript>
      <meta http-equiv="refresh" content="0; url=https://www.marshalllanning.com/blog/${post.slug}">
    </noscript>
</head>
<body>
    <article>
      <h1>${post.title}</h1>
      <p>${post.excerpt}</p>
      <p><a href="https://www.marshalllanning.com/blog/${post.slug}">Continue reading...</a></p>
    </article>
</body>
</html>`;
      
      await fs.writeFile(path.join(postDir, 'index.html'), html);
      console.log(`Generated static page for: ${post.slug}`);
    }
    
    console.log('✓ Static pages generated successfully');
  } catch (error) {
    console.error('Error generating static pages:', error);
    process.exit(1);
  }
}

generateStaticPages();