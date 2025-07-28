'use client'

import { FaLinkedin, FaTwitter, FaFacebook, FaReddit, FaLink } from 'react-icons/fa'

export default function ShareButtons({ post, book, currentUrl, type = 'post' }) {
  const content = post || book
  const shareTitle = type === 'book' ? `${content.title} - Book Review by Marshall Lanning` : content.title
  
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareTitle} - ${content.excerpt}`)}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(shareTitle)}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  return (
    <div className="flex items-center gap-4 py-6 border-t border-gray-800">
      <span className="text-gray-400 font-medium">Share this {type === 'book' ? 'review' : 'post'}:</span>
      <div className="flex gap-3">
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 hover:bg-blue-600 rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin size={18} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 hover:bg-blue-400 rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <FaTwitter size={18} />
        </a>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 hover:bg-blue-800 rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <FaFacebook size={18} />
        </a>
        <a
          href={shareLinks.reddit}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-gray-800 hover:bg-orange-600 rounded-full transition-colors"
          aria-label="Share on Reddit"
        >
          <FaReddit size={18} />
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2 bg-gray-800 hover:bg-gray-600 rounded-full transition-colors"
          aria-label="Copy link"
        >
          <FaLink size={18} />
        </button>
      </div>
    </div>
  )
}