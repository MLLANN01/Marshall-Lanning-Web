import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Blog - Marshall Lanning',
  description: 'Thoughts on software engineering, leadership, and technology',
}

export default async function BlogPage() {
  const dataPath = path.join(process.cwd(), 'data', 'blog-posts.json')
  
  let posts = []
  try {
    const data = await fs.readFile(dataPath, 'utf8')
    posts = JSON.parse(data)
  } catch (error) {
    console.error('Error loading blog posts:', error)
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-light text-white mb-4">Blog</h1>
        <p className="text-xl text-gray-400 mb-12">Thoughts on software engineering, leadership, and technology</p>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="bg-gray-900/50 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
                {post.featuredImage && (
                  <div className="relative h-48 bg-gray-800">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                  <h2 className="text-xl font-light text-white mt-2 mb-3 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}