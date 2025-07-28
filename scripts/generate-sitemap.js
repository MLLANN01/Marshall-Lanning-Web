import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateSitemap() {
  try {
    // Read blog posts
    const blogPostsPath = path.join(__dirname, '..', 'content', 'blog-posts.json');
    const blogPosts = JSON.parse(await fs.readFile(blogPostsPath, 'utf8'));
    
    const baseUrl = 'https://www.marshalllanning.com';
    const today = new Date().toISOString().split('T')[0];
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/books</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    
    // Add blog posts
    for (const post of blogPosts) {
      const postDate = new Date(post.date).toISOString().split('T')[0];
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }
    
    sitemap += '\n</urlset>';
    
    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemap);
    console.log('✓ Sitemap generated successfully');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

generateSitemap();