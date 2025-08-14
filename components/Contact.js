'use client'

export default function Contact() {
  return (
    <section id="contact" className="animate-fadeIn">
      <div className="mb-8">
        <p className="text-sm text-gray-500 font-light tracking-widest uppercase mb-2">Connect With Me</p>
        <h2 className="text-4xl font-light tracking-wide animate-slideInLeft">Contact</h2>
      </div>
      <div className="w-full h-px bg-gray-700 mb-8 animate-slideInLeft" />
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8 hover:border-gray-700 transition-all duration-300">
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-300 font-light">Let's collaborate on your next project</p>
          <a href="mailto:contact@marshalllanning.com" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-lg">Send me an email</span>
          </a>
          <p className="text-sm text-gray-400">I typically respond within 24 hours</p>
        </div>
      </div>
    </section>
  )
}