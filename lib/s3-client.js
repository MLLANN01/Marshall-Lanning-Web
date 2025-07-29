const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { fromNodeProviderChain } = require('@aws-sdk/credential-providers');

// Debug: Log all relevant environment variables
console.log('=== ENVIRONMENT VARIABLES DEBUG ===');
console.log('AWS_S3_BUCKET:', process.env.AWS_S3_BUCKET);
console.log('S3_BUCKET:', process.env.S3_BUCKET);
console.log('AWS_REGION:', process.env.AWS_REGION);
console.log('REGION:', process.env.REGION);
console.log('AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? '[SET]' : '[NOT SET]');
console.log('AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? '[SET]' : '[NOT SET]');
console.log('ACCESS_KEY_ID:', process.env.ACCESS_KEY_ID ? '[SET]' : '[NOT SET]');
console.log('SECRET_ACCESS_KEY:', process.env.SECRET_ACCESS_KEY ? '[SET]' : '[NOT SET]');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CLOUDFRONT_DOMAIN:', process.env.CLOUDFRONT_DOMAIN);
console.log('=== END DEBUG ===');

// Create S3 client - uses IAM role in production, access keys in development
const s3ClientConfig = {
  region: process.env.AWS_REGION || process.env.REGION || 'us-east-2',
};

// Use explicit credential provider chain
if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
  // Local development with explicit credentials
  s3ClientConfig.credentials = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  };
} else {
  // Production - use AWS credential provider chain (IAM role)
  s3ClientConfig.credentials = fromNodeProviderChain();
}

const s3Client = new S3Client(s3ClientConfig);

// Helper function to get text content from S3
async function getTextFromS3(key) {
  try {
    const bucket = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET;
    console.log(`Attempting to fetch from S3 - Bucket: ${bucket}, Key: ${key}`);
    
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const response = await s3Client.send(command);
    const text = await response.Body.transformToString();
    return text;
  } catch (error) {
    console.error(`Error fetching ${key} from S3:`, error.message);
    console.error(`Bucket: ${process.env.AWS_S3_BUCKET || process.env.S3_BUCKET}, Region: ${process.env.AWS_REGION || process.env.REGION}`);
    throw new Error('Content not found');
  }
}

// Helper function to list objects in a directory
async function listObjectsFromS3(prefix) {
  try {
    const bucket = process.env.AWS_S3_BUCKET || process.env.S3_BUCKET;
    console.log(`Listing objects from S3 - Bucket: ${bucket}, Prefix: ${prefix}`);
    
    const command = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);
    console.log(`Found ${response.Contents?.length || 0} objects with prefix: ${prefix}`);
    return response.Contents || [];
  } catch (error) {
    console.error(`Error listing objects with prefix ${prefix}:`, error.message);
    console.error(`Bucket: ${process.env.AWS_S3_BUCKET || process.env.S3_BUCKET}, Region: ${process.env.AWS_REGION || process.env.REGION}`);
    throw new Error('Failed to list content');
  }
}

// Cache implementation
const cache = new Map();
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function getCached(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
}

function setCache(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

// Input validation helper
function validateSlug(slug) {
  // Only allow alphanumeric, hyphens, and underscores
  const isValid = /^[a-zA-Z0-9_-]+$/.test(slug);
  if (!isValid) {
    throw new Error('Invalid slug format');
  }
  return slug;
}

module.exports = {
  getTextFromS3,
  listObjectsFromS3,
  getCached,
  setCache,
  validateSlug
};