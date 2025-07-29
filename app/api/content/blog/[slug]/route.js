import { NextResponse } from 'next/server';
import { fetchBlogPost } from '@/lib/content-utils';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    // Validate slug format (alphanumeric, hyphens, underscores only)
    if (!slug || !/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    // Fetch the specific blog post
    const post = await fetchBlogPost(slug);
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Return with security headers
    return NextResponse.json(post, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    
    // Generic error message (no stack traces)
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}