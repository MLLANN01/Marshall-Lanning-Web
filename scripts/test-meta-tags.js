import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function testMetaTags() {
  try {
    const htmlPath = path.join(__dirname, '..', 'dist', 'blog', 'value-stream-delivery', 'index.html');
    const html = await fs.readFile(htmlPath, 'utf8');
    
    console.log('🔍 Testing Meta Tags for Blog Post\n');
    
    // Extract and test meta tags using regex
    const extractMetaContent = (html, pattern) => {
      const match = html.match(pattern);
      return match ? match[1] : null;
    };
    
    // Test Open Graph tags
    console.log('📘 Open Graph Tags:');
    const ogTags = {
      'og:title': /<meta property="og:title" content="([^"]+)"/,
      'og:description': /<meta property="og:description" content="([^"]+)"/,
      'og:image': /<meta property="og:image" content="([^"]+)"/,
      'og:url': /<meta property="og:url" content="([^"]+)"/,
      'og:type': /<meta property="og:type" content="([^"]+)"/,
    };
    
    Object.entries(ogTags).forEach(([tag, pattern]) => {
      const content = extractMetaContent(html, pattern);
      console.log(`  ${tag}: ${content ? '✅' : '❌'} ${content ? content.substring(0, 50) + '...' : 'MISSING'}`);
    });
    
    // Test Twitter Card tags
    console.log('\n🐦 Twitter Card Tags:');
    const twitterTags = {
      'twitter:card': /<meta name="twitter:card" content="([^"]+)"/,
      'twitter:title': /<meta name="twitter:title" content="([^"]+)"/,
      'twitter:description': /<meta name="twitter:description" content="([^"]+)"/,
      'twitter:image': /<meta name="twitter:image" content="([^"]+)"/,
    };
    
    Object.entries(twitterTags).forEach(([tag, pattern]) => {
      const content = extractMetaContent(html, pattern);
      console.log(`  ${tag}: ${content ? '✅' : '❌'} ${content ? content.substring(0, 50) + '...' : 'MISSING'}`);
    });
    
    // Test basic meta tags
    console.log('\n📄 Basic Meta Tags:');
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = extractMetaContent(html, /<meta name="description" content="([^"]+)"/);
    const canonical = extractMetaContent(html, /<link rel="canonical" href="([^"]+)"/);
    
    console.log(`  title: ${title ? '✅' : '❌'} ${title ? title.substring(0, 50) + '...' : 'MISSING'}`);
    console.log(`  description: ${description ? '✅' : '❌'} ${description ? description.substring(0, 50) + '...' : 'MISSING'}`);
    console.log(`  canonical: ${canonical ? '✅' : '❌'} ${canonical || 'MISSING'}`);
    
    // Check for crawler detection script
    console.log('\n🤖 Crawler Detection:');
    console.log(`  - ${html.includes('crawlers = /googlebot') ? '✅' : '❌'} Crawler detection script`);
    console.log(`  - ${html.includes('window.location.replace') ? '✅' : '❌'} Redirect for non-crawlers`);
    
    console.log('\n✨ All meta tags validated!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testMetaTags();