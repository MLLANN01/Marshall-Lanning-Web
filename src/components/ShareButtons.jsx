import React from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaLink, FaReddit } from 'react-icons/fa';

const ShareButtons = ({ url, title, type = 'post' }) => {
  const fullUrl = `${window.location.origin}${url}`;
  
  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(fullUrl)}&text=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      // You could add a toast notification here
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = fullUrl;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const success = document.execCommand('copy');
        if (success) {
          alert('Link copied to clipboard!');
        }
      } catch (err) {
        console.error('Fallback: Unable to copy', err);
      }
      document.body.removeChild(textArea);
    }
  };

  const shareButtons = [
    {
      name: 'LinkedIn',
      icon: FaLinkedin,
      url: shareLinks.linkedin,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-600/10'
    },
    {
      name: 'Twitter',
      icon: FaTwitter,
      url: shareLinks.twitter,
      color: 'hover:text-blue-400',
      bgColor: 'hover:bg-blue-400/10'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: shareLinks.facebook,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/10'
    },
    {
      name: 'Reddit',
      icon: FaReddit,
      url: shareLinks.reddit,
      color: 'hover:text-orange-500',
      bgColor: 'hover:bg-orange-500/10'
    }
  ];

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-lg font-semibold text-gray-300">
        Share this {type}
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {shareButtons.map((platform) => (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 
                       rounded-lg transition-all duration-200 ${platform.color} ${platform.bgColor}
                       hover:scale-105 group`}
            title={`Share on ${platform.name}`}
          >
            <platform.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{platform.name}</span>
          </a>
        ))}
        
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 
                     rounded-lg transition-all duration-200 hover:text-gray-100 
                     hover:bg-gray-700 hover:scale-105 group"
          title="Copy link"
        >
          <FaLink className="w-4 h-4" />
          <span className="text-sm font-medium">Copy Link</span>
        </button>
      </div>
      
      {/* Alternative compact horizontal layout */}
      <div className="hidden md:flex items-center gap-4 pt-4 border-t border-gray-800">
        <span className="text-sm text-gray-500">Share:</span>
        <div className="flex gap-2">
          {shareButtons.map((platform) => (
            <a
              key={`compact-${platform.name}`}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 
                         rounded-full transition-all duration-200 ${platform.color} ${platform.bgColor}
                         hover:scale-110`}
              title={`Share on ${platform.name}`}
            >
              <platform.icon className="w-4 h-4" />
            </a>
          ))}
          
          <button
            onClick={copyToClipboard}
            className="w-10 h-10 flex items-center justify-center bg-gray-800 text-gray-400 
                       rounded-full transition-all duration-200 hover:text-gray-100 
                       hover:bg-gray-700 hover:scale-110"
            title="Copy link"
          >
            <FaLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareButtons;