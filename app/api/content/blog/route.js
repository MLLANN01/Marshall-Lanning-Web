import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import { NextResponse } from 'next/server';

const CONTENT_GITHUB_TOKEN = process.env.CONTENT_GITHUB_TOKEN;
const CONTENT_GITHUB_OWNER = process.env.CONTENT_GITHUB_OWNER || 'MLLANN01';
const CONTENT_GITHUB_REPO = process.env.CONTENT_GITHUB_REPO || 'marshall-lanning-content';

let cachedData = null;
let cacheTime = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

async function fetchBlogPosts() {
  // Check cache
  if (cachedData && cacheTime && Date.now() - cacheTime < CACHE_DURATION) {
    return cachedData;
  }

  if (!CONTENT_GITHUB_TOKEN) {
    throw new Error('CONTENT_GITHUB_TOKEN not configured');
  }

  const octokit = new Octokit({ auth: CONTENT_GITHUB_TOKEN });
  const blogData = [];

  try {
    // Fetch blog directory contents
    const { data: contents } = await octokit.repos.getContent({
      owner: CONTENT_GITHUB_OWNER,
      repo: CONTENT_GITHUB_REPO,
      path: 'blog',
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

    // Update cache
    cachedData = blogData;
    cacheTime = Date.now();

    return blogData;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
}

export async function GET(request) {
  try {
    const posts = await fetchBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog posts', message: error.message },
      { status: 500 }
    );
  }
}