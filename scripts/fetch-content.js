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
const USE_LOCAL_CONTENT = process.env.USE_LOCAL_CONTENT === 'true';

// Path to local content repository
const LOCAL_CONTENT_PATH = path.join(__dirname, '../../marshall-lanning-content');

let octokit;
if (!USE_LOCAL_CONTENT) {
  if (!CONTENT_GITHUB_TOKEN || !CONTENT_GITHUB_OWNER || !CONTENT_GITHUB_REPO) {
    console.error('Missing required environment variables. Please check your .env file or set USE_LOCAL_CONTENT=true for local development.');
    process.exit(1);
  }
  
  octokit = new Octokit({
    auth: CONTENT_GITHUB_TOKEN,
  });
}

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function fetchDirectoryContents(relativePath) {
  if (USE_LOCAL_CONTENT) {
    try {
      const fullPath = path.join(LOCAL_CONTENT_PATH, relativePath);
      const entries = await fs.readdir(fullPath, { withFileTypes: true });
      
      return entries.map(entry => ({
        name: entry.name,
        path: path.join(relativePath, entry.name),
        type: entry.isDirectory() ? 'dir' : 'file'
      }));
    } catch (error) {
      console.error(`Error reading local directory ${relativePath}:`, error.message);
      return [];
    }
  } else {
    try {
      const { data } = await octokit.repos.getContent({
        owner: CONTENT_GITHUB_OWNER,
        repo: CONTENT_GITHUB_REPO,
        path: relativePath,
      });
      
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      console.error(`Error fetching from GitHub ${relativePath}:`, error.message);
      return [];
    }
  }
}

async function fetchFileContent(filePath) {
  if (USE_LOCAL_CONTENT) {
    const fullPath = path.join(LOCAL_CONTENT_PATH, filePath);
    return await fs.readFile(fullPath, 'utf8');
  } else {
    const { data } = await octokit.repos.getContent({
      owner: CONTENT_GITHUB_OWNER,
      repo: CONTENT_GITHUB_REPO,
      path: filePath,
    });
    
    return Buffer.from(data.content, 'base64').toString('utf8');
  }
}

async function processBlogPosts() {
  console.log('Fetching blog posts...');
  const blogData = [];
  const blogContents = await fetchDirectoryContents('blog');
  
  for (const item of blogContents) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      const content = await fetchFileContent(item.path);
      const { data, content: markdown } = matter(content);
      
      if (data.title) {
        const slug = item.name.replace('.md', '');
        blogData.push({
          slug,
          title: data.title,
          date: data.date,
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
  const bookData = [];
  const bookContents = await fetchDirectoryContents('books');
  
  for (const item of bookContents) {
    if (item.type === 'file' && item.name.endsWith('.md')) {
      const content = await fetchFileContent(item.path);
      const { data, content: markdown } = matter(content);
      
      if (data.title) {
        const slug = item.name.replace('.md', '');
        bookData.push({
          slug,
          title: data.title,
          author: data.author,
          dateRead: data.dateRead,
          rating: data.rating,
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

async function copyImages() {
  const publicImagesDir = path.join(__dirname, '..', 'public', 'images');
  const sourceImagesDir = USE_LOCAL_CONTENT 
    ? path.join(LOCAL_CONTENT_PATH, 'images')
    : null;

  if (USE_LOCAL_CONTENT && sourceImagesDir) {
    try {
      await fs.access(sourceImagesDir);
      await ensureDirectoryExists(publicImagesDir);
      
      // Copy blog images
      const blogImagesSource = path.join(sourceImagesDir, 'blog');
      const blogImagesDest = path.join(publicImagesDir, 'blog');
      
      try {
        await fs.access(blogImagesSource);
        await ensureDirectoryExists(blogImagesDest);
        
        const blogImages = await fs.readdir(blogImagesSource);
        for (const image of blogImages) {
          if (image.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
            await fs.copyFile(
              path.join(blogImagesSource, image),
              path.join(blogImagesDest, image)
            );
          }
        }
        console.log(`✓ Copied ${blogImages.length} blog images`);
      } catch (error) {
        console.log('No blog images directory found');
      }
    } catch (error) {
      console.log('No images directory found in content repository');
    }
  }
}

async function saveContent() {
  const dataDir = path.join(__dirname, '..', 'data');
  await ensureDirectoryExists(dataDir);
  
  try {
    if (USE_LOCAL_CONTENT) {
      console.log('Using local content repository...');
    } else {
      console.log('Fetching content from GitHub...');
    }
    
    // Copy images first
    await copyImages();
    
    // Fetch and save blog posts
    const blogPosts = await processBlogPosts();
    await fs.writeFile(
      path.join(dataDir, 'blog-posts.json'),
      JSON.stringify(blogPosts, null, 2)
    );
    console.log(`✓ Saved ${blogPosts.length} blog posts`);
    
    // Fetch and save book reviews
    const bookReviews = await processBookReviews();
    await fs.writeFile(
      path.join(dataDir, 'book-reviews.json'),
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
      path.join(dataDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2)
    );
    
    console.log('✓ Content fetch completed successfully');
  } catch (error) {
    console.error('Error fetching content:', error);
    process.exit(1);
  }
}

// Run the fetch
saveContent();