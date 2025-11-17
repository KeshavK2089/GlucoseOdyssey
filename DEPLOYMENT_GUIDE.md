# 🚀 Deploy Glucose Odyssey to GitHub Pages

This guide will help you deploy your project to GitHub Pages in just a few steps!

## Step 1: Push to GitHub (Using Replit Git Pane)

1. **Open the Git panel** in Replit's left sidebar (look for the Git icon)
2. **Initialize repository** if not already done
3. **Connect to GitHub**:
   - Click "Connect to GitHub"
   - Choose "Create new repository"
   - Repository name: `glucose-odyssey` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
4. **Commit your changes**:
   - Click "Stage all changes"
   - Add commit message: "Initial commit: Glucose Odyssey educational platform"
   - Click "Commit & Push"

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository: `https://github.com/KeshavK2089/glucose-odyssey`
2. Click **Settings** tab
3. In the left sidebar, click **Pages**
4. Under **Source**, select:
   - Source: **GitHub Actions** (not "Deploy from a branch")
5. That's it! The GitHub Action will automatically build and deploy

## Step 3: Wait for Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You'll see a workflow running called "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be live!

## Step 4: Access Your Live Site

Your site will be available at:
```
https://KeshavK2089.github.io/glucose-odyssey/
```

(Replace with your actual username and repository name if different)

## What Happens Automatically

The GitHub Action (`.github/workflows/deploy.yml`) will:
- ✅ Install all dependencies
- ✅ Build your project for production
- ✅ Deploy to GitHub Pages
- ✅ Re-deploy automatically whenever you push changes

## Making Updates

To update your live site:
1. Make changes in Replit
2. Use the Git pane to commit and push
3. GitHub Actions will automatically rebuild and redeploy!

## Troubleshooting

### "Site not found" (404 error)
- Make sure you selected **GitHub Actions** as the source (not "Deploy from a branch")
- Check that the workflow completed successfully in the Actions tab

### Workflow failed
- Check the Actions tab for error details
- Usually means a build error - check the logs

### Changes not showing
- Wait 2-3 minutes for deployment to complete
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)

## Features Available on GitHub Pages

✅ **Working:**
- Interactive insulin simulator
- Real-time glucose visualization
- All UI interactions and animations
- Diabetes history timeline
- Prevention education content

⚠️ **Limited (uses mock data):**
- Research articles (PubMed API requires backend)
- AI summaries (OpenAI requires backend)

The simulator works 100% client-side, so all simulation features are fully functional!

---

**Made by Keshav Kotteswaran**
