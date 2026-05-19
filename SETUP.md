# Quick Setup Guide

Follow these steps to get your platform running in minutes.

## Step 1: Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, Supabase, and animation libraries.

## Step 2: Set Up Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready (~2 minutes)

### Get API Keys
1. Go to Project Settings → API
2. Copy "Project URL"
3. Copy "anon public" key
4. Copy "service_role" key (keep this secret!)

### Set Up Database
1. Go to SQL Editor in Supabase
2. Create new query
3. Copy entire content of `supabase/schema.sql`
4. Paste and run
5. Verify tables were created (check Table Editor)

### Add Sample Data (Optional)
1. In SQL Editor
2. Copy content of `supabase/sample-data.sql`
3. Paste and run
4. Check Table Editor to see sample projects, achievements

## Step 3: Configure Environment

Create `.env.local` file in root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
JWT_SECRET=generate-a-random-32-character-string
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Generate JWT Secret

Run this in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and paste as JWT_SECRET value.

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` - your platform should be live!

## Step 5: Test Admin Access

1. Go to `http://localhost:3000/admin/login`
2. Login with default credentials:
   - Email: `admin@example.com`
   - Password: `admin123`
3. **IMPORTANT**: Change password immediately!

## Step 6: Customize Content

### Update Personal Information

Edit Hero Section in `supabase/schema.sql` or through Supabase dashboard:

```sql
UPDATE homepage_content 
SET content = jsonb_set(content, '{name}', '"YOUR NAME"')
WHERE section = 'hero';

UPDATE homepage_content 
SET content = jsonb_set(content, '{roles}', '["Your Role 1", "Your Role 2"]')
WHERE section = 'hero';
```

### Add Your Projects

Use Supabase Table Editor or API:

```sql
INSERT INTO projects (title, description, technologies, github_url, live_url, status, featured)
VALUES (
  'Your Project Name',
  'Project description',
  ARRAY['React', 'Node.js', 'MongoDB'],
  'https://github.com/you/repo',
  'https://your-demo.com',
  'completed',
  true
);
```

### Update Contact Information

In ContactSection.tsx, update:
- Email address
- Location
- Other contact details

## Step 7: Deploy (Optional)

See `DEPLOYMENT.md` for detailed deployment instructions to:
- Vercel (Recommended)
- Netlify
- Railway
- Self-hosted

## Common Issues

### "Cannot find module" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection fails
- Check URL and API keys are correct
- Verify Supabase project is active
- Check for typos in .env.local

### Admin login doesn't work
- Verify schema.sql was run completely
- Check JWT_SECRET is set
- Clear browser localStorage

### Styles not loading
```bash
rm -rf .next
npm run dev
```

### Build fails
```bash
npm run build
```
Check the error message and fix TypeScript/ESLint issues.

## Next Steps

1. **Replace placeholder content** with your real information
2. **Add your professional photo** to hero section
3. **Customize colors** in `styles/globals.css`
4. **Set up custom domain** (see DEPLOYMENT.md)
5. **Enable analytics** for tracking

## File Structure Overview

```
engineering-platform/
├── app/                     # Next.js app directory
│   ├── (main)/             # Main website
│   │   └── page.tsx        # Landing page
│   ├── admin/              # Admin panel
│   │   ├── login/          # Login page
│   │   └── dashboard/      # Dashboard
│   └── api/                # API routes
├── components/             # React components
│   ├── landing/            # Landing sections
│   ├── effects/            # Visual effects
│   └── shared/             # Shared components
├── lib/                    # Utilities
├── styles/                 # Global styles
├── supabase/              # Database files
└── public/                # Static assets
```

## Getting Help

- Check README.md for detailed documentation
- Check DEPLOYMENT.md for deployment help
- Review code comments
- Check Next.js documentation
- Check Supabase documentation

## Security Reminders

✅ Change default admin password
✅ Use strong JWT_SECRET
✅ Never commit .env files
✅ Keep API keys secret
✅ Enable Supabase RLS in production
✅ Use HTTPS in production

---

**You're all set! Start customizing and make it yours.** 🚀
