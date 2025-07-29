const { S3Client, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Create S3 client - uses IAM role in production, access keys in development
const s3ClientConfig = {
  region: process.env.REGION || 'us-east-2',
};

// Only add credentials for local development
if (process.env.ACCESS_KEY_ID && process.env.SECRET_ACCESS_KEY) {
  s3ClientConfig.credentials = {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  };
}

const s3Client = new S3Client(s3ClientConfig);

// Helper function to get text content from S3
async function getTextFromS3(key) {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
    });

    const response = await s3Client.send(command);
    const text = await response.Body.transformToString();
    return text;
  } catch (error) {
    console.error(`Error fetching ${key} from S3:`, error.message);
    throw new Error('Content not found');
  }
}

// Helper function to list objects in a directory
async function listObjectsFromS3(prefix) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET,
      Prefix: prefix,
      Delimiter: '/',
    });

    const response = await s3Client.send(command);
    return response.Contents || [];
  } catch (error) {
    console.error(`Error listing objects with prefix ${prefix}:`, error.message);
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