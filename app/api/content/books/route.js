import { NextResponse } from 'next/server';
import { fetchBookReviews } from '@/lib/content-utils';

// Rate limiting implementation
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // 30 requests per minute

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = requestCounts.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

export async function GET(request) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: {
            'Retry-After': '60',
          }
        }
      );
    }

    // Fetch book reviews
    const books = await fetchBookReviews();
    
    // Return with security headers
    return NextResponse.json(books, {
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
      { error: 'Failed to fetch book reviews' },
      { status: 500 }
    );
  }
}