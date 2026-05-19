# Premium Engineering & Research Platform

A production-grade, cinematic personal engineering platform built with Next.js, TypeScript, and Supabase. Features immersive animations, dynamic content management, and a futuristic design system.

## 🚀 Features

### Frontend Experience
- **Cinematic Design**: Dark, futuristic interface with premium animations
- **Interactive Effects**: Custom cursor, eye tracking, animated backgrounds
- **Smooth Animations**: Framer Motion & GSAP-powered transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Performance**: Lazy loading, code splitting, optimized rendering

### Content Sections
- **Hero Section**: Dynamic role switching, professional image showcase
- **About**: Professional summary with education and experience
- **Skills**: Interactive domain-based skill ecosystem
- **Projects**: Fully dynamic project showcase with GitHub/live links
- **Research**: Publications and research papers management
- **Achievements**: Competition results and recognition showcase
- **Contact**: Social links and contact information

### Admin Panel
- **Authentication**: Secure JWT-based admin authentication
- **Dashboard**: Real-time statistics and content overview
- **CMS**: Full CRUD operations for all content types
- **Dynamic Management**: Projects, research, achievements, certifications, social links

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- Git

## 🛠️ Installation & Setup

### 1. Clone and Install

```bash
# Extract the project
unzip engineering-platform.zip
cd engineering-platform

# Install dependencies
npm install
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Project Settings → API
3. Copy your project URL and anon key
4. Go to SQL Editor and run the schema:

```bash
# Copy and execute the entire content of supabase/schema.sql in Supabase SQL Editor
```

This will create all necessary tables and insert default data.

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT Secret for Admin Auth
JWT_SECRET=generate-a-random-secret-key-here

# Next.js
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your platform!

## 🔐 Admin Access

### Default Credentials
```
Email: admin@example.com
Password: admin123
```

**⚠️ IMPORTANT: Change these immediately after first login!**

### Admin Routes
- Login: `/admin/login`
- Dashboard: `/admin/dashboard`

These routes are hidden and won't appear in the navigation.

## 📊 Managing Content

### Adding Projects

Use the Supabase dashboard or create API calls:

```typescript
// Example: Add a project
const newProject = {
  title: "SWACHH-AI",
  description: "AI-powered waste management system",
  technologies: ["React", "Python", "TensorFlow"],
  github_url: "https://github.com/username/swachh-ai",
  live_url: "https://swachh-ai.vercel.app",
  status: "completed",
  featured: true
};

await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProject)
});
```

### Content Types

**Projects**: title, description, technologies[], github_url, live_url, status, featured

**Research**: title, abstract, authors[], publication_date, journal, pdf_url, type

**Achievements**: title, description, position, organization, event_date, certificate_url

**Social Links**: platform, url, icon, visible

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The app works on any Node.js hosting:
- Netlify
- Railway
- Render
- AWS Amplify

Update `NEXT_PUBLIC_SITE_URL` to your production URL.

## 📁 Project Structure

```
engineering-platform/
├── app/
│   ├── (main)/              # Main website pages
│   │   ├── page.tsx         # Landing page
│   │   └── layout.tsx       # Main layout with effects
│   ├── admin/               # Admin panel
│   │   ├── login/
│   │   └── dashboard/
│   ├── api/                 # API routes
│   │   ├── projects/
│   │   ├── research/
│   │   ├── achievements/
│   │   ├── socials/
│   │   └── auth/
│   └── layout.tsx           # Root layout
├── components/
│   ├── landing/             # Landing page sections
│   ├── admin/               # Admin components
│   ├── shared/              # Shared components (Navbar)
│   ├── effects/             # Visual effects
│   └── ui/                  # UI components
├── lib/
│   ├── supabase/            # Supabase client
│   └── utils/               # Utility functions
├── styles/
│   └── globals.css          # Global styles
├── supabase/
│   └── schema.sql           # Database schema
└── public/                  # Static assets
```

## 🎨 Customization

### Colors

Edit `styles/globals.css`:

```css
:root {
  --color-accent-blue: #4a9eff;
  --color-accent-cyan: #00d4ff;
  --color-accent-violet: #7c3aed;
}
```

### Content

Update homepage content in Supabase:

```sql
UPDATE homepage_content 
SET content = '{"name": "YOUR NAME", "roles": ["Role 1", "Role 2"]}'
WHERE section = 'hero';
```

### Fonts

Current fonts: Inter, Space Grotesk, JetBrains Mono

To change, edit `app/layout.tsx`.

## 🔧 Troubleshooting

### Supabase Connection Error
- Verify environment variables are correct
- Check Supabase project is active
- Ensure schema is executed

### Admin Login Not Working
- Verify JWT_SECRET is set
- Check default admin was created (run schema.sql)
- Clear browser localStorage

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm install
npm run build
```

## 🌟 Features to Add

The platform is designed to be extended. Consider adding:

- Blog system
- Contact form with email integration
- Analytics integration
- Dark/light theme toggle
- Multi-language support
- Search functionality
- Comments system

## 📝 Database Maintenance

### Backup Data

```sql
-- Export data from Supabase
SELECT * FROM projects;
SELECT * FROM research;
SELECT * FROM achievements;
```

### Reset Database

Re-run `supabase/schema.sql` in Supabase SQL Editor.

## 🔒 Security Best Practices

1. **Change default admin credentials immediately**
2. Use strong JWT_SECRET (32+ characters)
3. Enable Row Level Security (RLS) in Supabase
4. Use environment variables for all secrets
5. Regularly update dependencies
6. Enable HTTPS in production

## 📈 Performance Optimization

The platform is already optimized with:
- Lazy loading of images and components
- Code splitting
- Optimized animations
- Efficient database queries
- Caching strategies

Monitor performance with:
- Vercel Analytics
- Google Lighthouse
- Web Vitals

## 🤝 Contributing

This is a personal platform, but feel free to:
- Report bugs
- Suggest features
- Fork and customize for your own use

## 📄 License

This project is open source and available for personal use.

## 🙋‍♂️ Support

For issues or questions:
- Check this README
- Review the code comments
- Check Supabase documentation
- Review Next.js documentation

## 🎉 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide Icons](https://lucide.dev/)

---

**Built with passion by Pranav Balasaheb Deokar**

*A production-grade engineering platform that doesn't look AI-generated.*
