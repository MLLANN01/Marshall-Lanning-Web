'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaTimes, FaCopy, FaCheck } from 'react-icons/fa'

export default function VirtualBusinessCard({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [copiedPhone, setCopiedPhone] = useState(false)

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === 'email') {
        setCopiedEmail(true)
        setTimeout(() => setCopiedEmail(false), 2000)
      } else if (type === 'phone') {
        setCopiedPhone(true)
        setTimeout(() => setCopiedPhone(false), 2000)
      }
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 max-w-md w-full relative border border-gray-700 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FaTimes size={20} />
        </button>
        
        <div className="text-center space-y-6">
          {/* Profile Image */}
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-60"></div>
            <Image
              src="/profile-square.png"
              alt="Marshall Lanning"
              width={96}
              height={96}
              className="relative w-24 h-24 rounded-full object-cover border-2 border-gray-700"
            />
          </div>

          {/* Name and Title */}
          <div>
            <h2 className="text-2xl font-light text-white mb-1">Marshall Lanning</h2>
            <p className="text-gray-400 text-sm">Software Engineering Leader</p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            {/* Email */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <p className="text-white font-mono text-sm">Marshall.Lanning.37@gmail.com</p>
                </div>
                <button
                  onClick={() => copyToClipboard('Marshall.Lanning.37@gmail.com', 'email')}
                  className="ml-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  title="Copy email"
                >
                  {copiedEmail ? <FaCheck className="text-green-400" size={14} /> : <FaCopy className="text-gray-300" size={14} />}
                </button>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <p className="text-white font-mono text-sm">502-767-6013</p>
                </div>
                <button
                  onClick={() => copyToClipboard('502-767-6013', 'phone')}
                  className="ml-3 p-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                  title="Copy phone"
                >
                  {copiedPhone ? <FaCheck className="text-green-400" size={14} /> : <FaCopy className="text-gray-300" size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}