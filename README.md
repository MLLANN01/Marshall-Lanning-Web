# Marshall Lanning - Portfolio Website

My personal portfolio website showcasing my journey as a Software Engineering Leader. Built with Next.js and modern web technologies.

🌐 **Live at**: [marshalllanning.com](https://marshalllanning.com)

## Overview

This is my professional portfolio website featuring:
- Modern Hero section with virtual business card modal
- Interactive blog with technical articles and insights
- Book reviews with ratings and purchase links
- Real GitHub contributions calendar
- Skills showcase with technology icons
- Professional experience timeline
- Mobile-first responsive design

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 18** - UI library with server components
- **Tailwind CSS** - Utility-first styling framework
- **TypeScript** - Type-safe development (ready)
- **Markdown** - Content management for blog posts

## Key Features

### 🎨 Design & UX
- Dark theme with glassmorphism design
- Fully responsive across all devices (mobile-first)
- Smooth animations and transitions
- Virtual business card for easy contact sharing

### 📝 Content Management
- Dynamic blog system with markdown support
- Image captions and optimized media handling
- Book review system with ratings
- SEO optimization with meta tags and Open Graph

### 🔧 Technical Features
- GitHub contributions calendar integration
- Server-side rendering and static generation
- Dynamic routing for blog posts and book reviews
- Performance optimized with Next.js Image component

### 🌐 Social Integration
- LinkedIn, GitHub, SoundCloud links
- Social sharing buttons for blog posts
- Contact form integration ready

## Getting Started

```bash
# Clone the repo
git clone https://github.com/MLLANN01/Marshall-Lanning-Web.git

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── blog/              # Blog pages
│   │   ├── [slug]/        # Dynamic blog post pages
│   │   └── page.js        # Blog listing page
│   ├── books/             # Book review pages
│   │   ├── [slug]/        # Dynamic book review pages
│   │   └── page.js        # Book listing page
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout component
│   └── page.js            # Home page
├── components/            # Reusable React components
│   ├── About.js           # About section with social cards
│   ├── Experience.js      # Professional experience timeline
│   ├── GitHubContributions.js  # GitHub calendar integration
│   ├── Navbar.js          # Navigation component
│   ├── Projects.js        # Project showcase
│   ├── Skills.js          # Skills and technologies
│   ├── VirtualBusinessCard.js   # Contact modal
│   └── ...
├── data/                  # Content data files
│   ├── blog-posts.json    # Blog metadata
│   ├── book-reviews.json  # Book review data
│   └── metadata.json      # Site metadata
├── public/                # Static assets
│   ├── images/           # Optimized images
│   ├── projects/         # Project screenshots
│   └── icon/             # Technology icons
└── content/              # Markdown content (external)
```

## Customization

To use this template for your own portfolio:

1. **Personal Information**
   - Update `data/metadata.json` with your details
   - Replace profile images in `public/`
   - Modify contact information in `VirtualBusinessCard.js`

2. **Content**
   - Add your projects to `Projects.js`
   - Update experience in `Experience.js`
   - Modify skills in `Skills.js`
   - Add your GitHub username for contributions calendar

3. **Styling**
   - Customize colors in `tailwind.config.js`
   - Modify global styles in `app/globals.css`
   - Update component-specific styling

## Deployment

### AWS Amplify (Recommended)
The site includes `amplify.yml` for automatic deployment:
```bash
# Automatically deploys on git push
git push origin main
```

### Other Platforms
```bash
# Build for production
npm run build

# The .next folder contains the production build
# Deploy to Vercel, Netlify, or any Next.js compatible platform
```

## Performance Features

- **Image Optimization** - Next.js Image component with lazy loading
- **Static Generation** - Pre-built pages for optimal performance
- **Code Splitting** - Automatic bundle optimization
- **Dynamic Imports** - Reduced initial bundle size
- **SEO Optimization** - Meta tags and structured data

---

Feel free to use this as inspiration for your own portfolio!

**Marshall Lanning** | [GitHub](https://github.com/MLLANN01) | [LinkedIn](https://linkedin.com/in/marshall-lanning)