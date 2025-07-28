import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://www.marshalllanning.com'),
  title: 'Marshall Lanning - Software Engineering Leader',
  description: 'Software engineering leader focused on AI integration, value driven development, and modern software delivery practices.',
  openGraph: {
    title: 'Marshall Lanning - Software Engineering Leader',
    description: 'Software engineering leader focused on AI integration, value driven development, and modern software delivery practices.',
    url: 'https://www.marshalllanning.com',
    siteName: 'Marshall Lanning',
    images: [
      {
        url: '/profile-square.png',
        width: 512,
        height: 512,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Marshall Lanning - Software Engineering Leader',
    description: 'Software engineering leader focused on AI integration, value driven development, and modern software delivery practices.',
    images: ['/profile-square.png'],
  },
  icons: {
    icon: [
      { url: '/icon/marshall/favicon.ico' },
      { url: '/icon/marshall/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon/marshall/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icon/marshall/apple-touch-icon.png' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen relative overflow-x-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-black pointer-events-none" />
        <div 
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`
          }}
        />
        <Navbar />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  )
}