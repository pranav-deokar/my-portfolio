# Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Supabase project set up

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo.git
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `JWT_SECRET`
  - `NEXT_PUBLIC_SITE_URL` (your vercel domain)
- Click "Deploy"

3. **Post-Deployment**
- Update `NEXT_PUBLIC_SITE_URL` to your Vercel domain
- Update robots.txt sitemap URL
- Test admin login at `your-domain.com/admin/login`

## Alternative Deployments

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

Add environment variables in Netlify dashboard.

### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize
railway init

# Deploy
railway up
```

### Docker (Self-Hosted)

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t engineering-platform .
docker run -p 3000:3000 --env-file .env engineering-platform
```

## Domain Configuration

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown
4. Update `NEXT_PUBLIC_SITE_URL`

### SSL/HTTPS

Vercel provides automatic SSL. For other platforms:
- Use Cloudflare for free SSL
- Use Let's Encrypt with Certbot
- Platform-specific SSL certificates

## Performance Optimization

### After Deployment

1. **Enable Compression** (Usually automatic on Vercel)
2. **Configure CDN** (Vercel Edge Network included)
3. **Set up Analytics**
   ```bash
   npm install @vercel/analytics
   ```
   Add to layout:
   ```tsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <>
         {children}
         <Analytics />
       </>
     );
   }
   ```

4. **Monitor Performance**
   - Use Vercel Analytics
   - Run Lighthouse audits
   - Monitor Web Vitals

## Troubleshooting Deployment

### Build Fails

```bash
# Clear cache and rebuild locally
rm -rf .next node_modules
npm install
npm run build
```

### Environment Variables Not Working

- Check variable names are exact
- No quotes needed in Vercel
- Redeploy after adding variables

### Database Connection Issues

- Verify Supabase URL is correct
- Check API keys are valid
- Ensure Supabase project is active

### 404 on Routes

- Next.js uses file-based routing
- Check file names match routes
- Verify build completed successfully

## Security Checklist

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET
- [ ] Enable Supabase RLS policies
- [ ] Use HTTPS only
- [ ] Set secure headers
- [ ] Enable rate limiting
- [ ] Regular dependency updates

## Monitoring

### Set Up Error Tracking

Install Sentry:
```bash
npm install @sentry/nextjs
```

### Set Up Uptime Monitoring

- Use UptimeRobot (free)
- Vercel has built-in monitoring
- Set up status page

## Backup Strategy

### Database Backups

- Supabase has automatic backups
- Manual export regularly:
  ```sql
  -- Export all data
  pg_dump your_database > backup.sql
  ```

### Code Backups

- GitHub is your primary backup
- Use GitHub Actions for automated backups
- Keep local copies

## Scaling

### When You Grow

1. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload
   - Use WebP format

2. **Implement Caching**
   - Use SWR or React Query
   - Cache API responses
   - Use Vercel Edge Caching

3. **Database Optimization**
   - Add indexes to frequently queried columns
   - Optimize queries
   - Consider connection pooling

4. **Upgrade Hosting**
   - Vercel Pro for better performance
   - Supabase Pro for more resources
   - Consider dedicated servers for very high traffic

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check Supabase logs
3. Review Next.js documentation
4. Check GitHub issues

## Cost Estimates

### Free Tier (Good for getting started)
- Vercel: Free (Hobby plan)
- Supabase: Free (includes 500MB database, 2GB bandwidth)
- Domain: $10-15/year

### Production (Recommended)
- Vercel Pro: $20/month
- Supabase Pro: $25/month
- Domain: $10-15/year
- **Total: ~$45-50/month**

### Enterprise
- Vercel Enterprise: Custom pricing
- Supabase Team: $599/month
- CDN: Additional costs
- **Total: $1000+/month**
