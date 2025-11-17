# GitHub Pages Deployment Guide

## Overview
This guide explains how to deploy Glucose Odyssey to GitHub Pages for static hosting.

## Prerequisites
- GitHub account
- Git installed locally
- Node.js 20+ installed

## Deployment Steps

### 1. Build the Project

```bash
npm install
npm run build
```

This generates optimized static files in the `dist/` directory.

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `glucose-odyssey` (or your preferred name)
3. Make it public
4. Don't initialize with README (we already have one)

### 3. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Glucose Odyssey MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/glucose-odyssey.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 4. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/` (root)
4. Click **Save**

### 5. Update Base Path (if needed)

If your site will be at `username.github.io/glucose-odyssey` (not a custom domain):

1. Edit `vite.config.ts`
2. Add `base: '/glucose-odyssey/'` to the config:

```typescript
export default defineConfig({
  base: '/glucose-odyssey/',  // Add this line
  // ... rest of config
});
```

3. Rebuild: `npm run build`
4. Commit and push the changes

### 6. Deploy Build Files

**Option A: Manual Deploy**
```bash
npm run build
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

**Option B: GitHub Actions (Recommended)**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Then:
1. In GitHub Settings → Pages, change source to `gh-pages` branch
2. Push changes to trigger the action

### 7. Access Your Site

Your site will be available at:
- `https://YOUR_USERNAME.github.io/glucose-odyssey/` (repository name)
- OR `https://YOUR_USERNAME.github.io/` (if repo is named `YOUR_USERNAME.github.io`)

## Features in GitHub Pages Deployment

### Working Features ✅
- ✅ Interactive insulin simulator with full calculations
- ✅ Real-time glucose-insulin visualization
- ✅ Parameter controls and scenario testing
- ✅ Static research article display (mock data)
- ✅ All animations and UI interactions
- ✅ Responsive design for mobile/desktop
- ✅ Dark mode futuristic theme

### Limited Features ⚠️
- ⚠️ Research articles use static mock data (no live PubMed API)
- ⚠️ No AI summarization (static summaries provided)
- ⚠️ No backend data persistence

## Customization for Live Backend

To enable full features with a backend:

### Option 1: Use Replit Deployment
Deploy the full-stack app on Replit:
```bash
# In Replit, click "Deploy" button
# Choose "Autoscale" or "Reserved VM"
# Your app will have a live URL with full backend
```

### Option 2: Use Serverless Functions
Host static files on GitHub Pages and API on Vercel/Netlify:

1. Deploy frontend to GitHub Pages (as above)
2. Deploy backend to Vercel:
   ```bash
   npm install -g vercel
   vercel --prod
   ```
3. Update API calls in frontend to point to Vercel URL

### Option 3: Client-Side Only
For GitHub Pages, the app automatically uses:
- Local simulation calculations (runs in browser)
- Static mock research data (`/mock-research.json`)

## Troubleshooting

**404 errors on routes:**
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`

**Blank page:**
- Check browser console for errors
- Verify `base` path in `vite.config.ts` matches your URL
- Make sure you're accessing the correct URL

**Build fails:**
- Run `npm install` first
- Check Node.js version (need 20+)
- Clear `node_modules` and reinstall

## Custom Domain (Optional)

1. Buy a domain (e.g., from Namecheap, Google Domains)
2. In GitHub Settings → Pages, add custom domain
3. Add DNS records:
   ```
   A Record: 185.199.108.153
   A Record: 185.199.109.153
   A Record: 185.199.110.153
   A Record: 185.199.111.153
   ```
4. Wait for DNS propagation (up to 48 hours)

## Support

For issues:
- Check [GitHub Pages Documentation](https://docs.github.com/en/pages)
- Open an issue in the repository
- Contact the development team

---

**Note**: The static deployment includes all core features except live research fetching. For full functionality including PubMed integration and AI summarization, use the Replit deployment or set up a backend server.
