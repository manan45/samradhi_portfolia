# 🚀 Netlify Deployment Guide

This guide will help you deploy Samridhi Nagar's portfolio website to Netlify.

## 📋 Prerequisites

1. **Netlify Account**: Sign up at [netlify.com](https://netlify.com)
2. **GitHub Account**: Sign up at [github.com](https://github.com) (optional but recommended)

## 🌐 Deployment Methods

### Method 1: GitHub + Netlify (Recommended)

#### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and create a new repository
2. Name it `samridhi-portfolio` or `portfolio`
3. Make it public
4. Don't initialize with README (we already have files)

#### Step 2: Push to GitHub
```bash
# Add GitHub remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/samridhi-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 3: Connect to Netlify
1. Go to [netlify.com](https://netlify.com) and log in
2. Click "New site from Git"
3. Choose "GitHub" and authorize Netlify
4. Select your `samridhi-portfolio` repository
5. Configure build settings:
   - **Base directory**: Leave empty
   - **Build command**: Leave empty (static site)
   - **Publish directory**: `.` (current directory)
6. Click "Deploy site"

### Method 2: Direct File Upload

#### Step 1: Prepare Files
1. Create a zip file with all project files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `netlify.toml`
   - `_headers`

#### Step 2: Manual Deploy
1. Go to [netlify.com](https://netlify.com) and log in
2. Drag and drop the project folder to the deployment area
3. Netlify will automatically deploy your site

### Method 3: Netlify CLI

#### Step 1: Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### Step 2: Login and Deploy
```bash
# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod --dir=.
```

## ⚙️ Configuration

The site includes:

- **`netlify.toml`**: Build and redirect configuration
- **`_headers`**: Security and caching headers
- **`.gitignore`**: Git ignore rules
- **`package.json`**: Project metadata

## 🔧 Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain (e.g., `samridhinagar.com`)
4. Follow DNS configuration instructions

## 🛡️ Security Features

The site includes:
- HTTPS by default
- Security headers (XSS protection, content type options)
- Frame protection
- Proper caching policies

## 📊 Performance Optimizations

- Optimized images and assets
- Efficient CSS and JavaScript
- Proper caching headers
- CDN distribution via Netlify

## 🌟 Features Included

- **Responsive Design**: Works on all devices
- **Modern UI**: Glass-morphism effects and animations
- **Professional Content**: Real achievements and metrics
- **Contact Integration**: Direct email and phone links
- **SEO Optimized**: Proper meta tags and structure

## 📱 Live Site

Once deployed, your site will be available at:
- `https://YOUR_SITE_NAME.netlify.app`
- Or your custom domain if configured

## 🎯 Next Steps

1. **Monitor Performance**: Use Netlify Analytics
2. **Form Handling**: Add Netlify Forms if needed
3. **SEO**: Submit to Google Search Console
4. **Analytics**: Add Google Analytics if desired

## 🆘 Troubleshooting

### Common Issues:

1. **Build Failed**: Check netlify.toml configuration
2. **Assets Not Loading**: Verify file paths are relative
3. **Contact Form**: Enable Netlify Forms in dashboard

### Support:
- Netlify Documentation: [docs.netlify.com](https://docs.netlify.com)
- GitHub Issues: Create issues in your repository

---

**Portfolio Created For**: Samridhi Nagar  
**Contact**: Samradhingr@gmail.com  
**LinkedIn**: [Samridhi Nagar](https://www.linkedin.com/in/samradhi-nagar-514323192)
