import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const CONTENT_GITHUB_TOKEN = process.env.CONTENT_GITHUB_TOKEN;
const CONTENT_GITHUB_OWNER = process.env.CONTENT_GITHUB_OWNER;
const CONTENT_GITHUB_REPO = process.env.CONTENT_GITHUB_REPO;

if (!CONTENT_GITHUB_TOKEN || !CONTENT_GITHUB_OWNER || !CONTENT_GITHUB_REPO) {
  console.error('Missing required environment variables. Please check your .env file.');
  process.exit(1);
}

const octokit = new Octokit({
  auth: CONTENT_GITHUB_TOKEN,
});

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function fetchDirectoryContents(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: CONTENT_GITHUB_OWNER,
      repo: GITHUB_REPCONTENT_GITHUB_REPOO,
      path,
    });
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error(`Error fetching directory ${path}:`, error.message);
    return [];
  }
}

async function fetchFileContent(path) {
  try {
    const { data } = await octokit.repos.getContent({
      owner: CONTENT_GITHUB_OWNER,
      repo: CONTENT_GITHUB_REPO,
      path,
    });
    
    if (data.type === 'file' && data.content) {
      return Buffer.from(data.content, 'base64').toString('utf-8');
    }
    return null;
  } catch (error) {
    console.error(`Error fetching file ${path}:`, error.message);
    return null;
  }
}

async function processBlogPosts() {
  console.log('Fetching blog posts...');
  const posts = await fetchDirectoryContents('blog');
  const blogData = [];

  for (const post of posts) {
    if (post.type === 'file' && post.name.endsWith('.md')) {
      const content = await fetchFileContent(post.path);
      if (content) {
        const { data, content: markdown } = matter(content);
        
        // Generate slug from filename
        const slug = post.name.replace('.md', '');
        
        blogData.push({
          slug,
          title: data.title || 'Untitled',
          date: data.date || new Date().toISOString(),
          author: data.author || 'Marshall Lanning',
          excerpt: data.excerpt || markdown.substring(0, 150) + '...',
          tags: data.tags || [],
          featuredImage: data.featuredImage || null,
          content: markdown,
          ...data,
        });
      }
    }
  }

  // Sort by date (newest first)
  blogData.sort((a, b) => new Date(b.date) - new Date(a.date));

  return blogData;
}

async function processBookReviews() {
  console.log('Fetching book reviews...');
  const books = await fetchDirectoryContents('books');
  const bookData = [];

  for (const book of books) {
    if (book.type === 'file' && book.name.endsWith('.md')) {
      const content = await fetchFileContent(book.path);
      if (content) {
        const { data, content: markdown } = matter(content);
        
        // Generate slug from filename
        const slug = book.name.replace('.md', '');
        
        bookData.push({
          slug,
          title: data.title || 'Untitled',
          author: data.author || 'Unknown Author',
          isbn: data.isbn || null,
          dateRead: data.dateRead || new Date().toISOString(),
          datePublished: data.datePublished || null,
          rating: data.rating || 0,
          status: data.status || 'completed',
          category: data.category || 'Uncategorized',
          tags: data.tags || [],
          coverImage: data.coverImage || null,
          purchaseLink: data.purchaseLink || null,
          excerpt: data.excerpt || markdown.substring(0, 150) + '...',
          recommendedFor: data.recommendedFor || [],
          keyTakeaways: data.keyTakeaways || [],
          content: markdown,
          ...data,
        });
      }
    }
  }

  // Sort by date read (newest first)
  bookData.sort((a, b) => new Date(b.dateRead) - new Date(a.dateRead));

  return bookData;
}

async function saveContent() {
  const contentDir = path.join(__dirname, '..', 'content');
  await ensureDirectoryExists(contentDir);

  try {
    // Fetch and save blog posts
    const blogPosts = await processBlogPosts();
    await fs.writeFile(
      path.join(contentDir, 'blog-posts.json'),
      JSON.stringify(blogPosts, null, 2)
    );
    console.log(`✓ Saved ${blogPosts.length} blog posts`);

    // Fetch and save book reviews
    const bookReviews = await processBookReviews();
    await fs.writeFile(
      path.join(contentDir, 'book-reviews.json'),
      JSON.stringify(bookReviews, null, 2)
    );
    console.log(`✓ Saved ${bookReviews.length} book reviews`);

    // Create a metadata file with last update time
    const metadata = {
      lastUpdated: new Date().toISOString(),
      blogCount: blogPosts.length,
      bookCount: bookReviews.length,
    };
    await fs.writeFile(
      path.join(contentDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    console.log('✓ Content fetch completed successfully');

  } catch (error) {
    console.error('Error saving content:', error);
    process.exit(1);
  }
}

// Run the script
saveContent();