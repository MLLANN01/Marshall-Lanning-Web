import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const CONTENT_GITHUB_TOKEN = process.env.CONTENT_GITHUB_TOKEN;
const CONTENT_GITHUB_OWNER = process.env.CONTENT_GITHUB_OWNER || 'MLLANN01';
const CONTENT_GITHUB_REPO = process.env.CONTENT_GITHUB_REPO || 'marshall-lanning-content';

let cachedData = null;
let cacheTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchBookReviews() {
  // Check cache
  if (cachedData && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedData;
  }

  if (!CONTENT_GITHUB_TOKEN) {
    throw new Error('CONTENT_GITHUB_TOKEN not configured');
  }

  const octokit = new Octokit({ auth: CONTENT_GITHUB_TOKEN });
  const bookData = [];

  try {
    // Fetch books directory contents
    const { data: contents } = await octokit.repos.getContent({
      owner: CONTENT_GITHUB_OWNER,
      repo: CONTENT_GITHUB_REPO,
      path: 'books',
    });

    // Process each markdown file
    for (const item of contents) {
      if (item.type === 'file' && item.name.endsWith('.md')) {
        const { data: fileData } = await octokit.repos.getContent({
          owner: CONTENT_GITHUB_OWNER,
          repo: CONTENT_GITHUB_REPO,
          path: item.path,
        });

        const content = Buffer.from(fileData.content, 'base64').toString('utf8');
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

    // Update cache
    cachedData = bookData;
    cacheTime = Date.now();

    return bookData;
  } catch (error) {
    console.error('Error fetching book reviews:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const books = await fetchBookReviews();
    return NextResponse.json(books);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch book reviews', message: error.message },
      { status: 500 }
    );
  }
}