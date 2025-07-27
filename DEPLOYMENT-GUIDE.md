# 🚀 Deployment Guide - Edulita Insight

Complete guide for deploying Edulita Insight to Vercel with Node.js v22.17.1 optimizations.

## 📋 Prerequisites

### Required Software
- **Node.js v22.17.1+** (recommended for optimal performance)
- **npm v10.9.2+** 
- **Git** (for version control)
- **GitHub account** (for repository hosting)
- **Vercel account** (for deployment)

### Required API Keys
- **Google AI Studio API Key** (REQUIRED) - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Supabase credentials** (OPTIONAL) - App works in demo mode without it

## 🛠️ Pre-Deployment Setup

### 1. Verify Your Environment

\`\`\`bash
# Check Node.js version (should be v22+)
node --version

# Check npm version (should be v10+)
npm --version

# Check if all dependencies install correctly
npm install

# Run type checking
npm run type-check

# Test build locally
npm run build
\`\`\`

### 2. Environment Variables Setup

Create a `.env.local` file with these variables:

\`\`\`env
# REQUIRED - Get from https://makersuite.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=your-actual-api-key-here
NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY=your-actual-api-key-here

# OPTIONAL - For production database (demo mode works without these)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# RECOMMENDED - Generate a random string for security
NEXTAUTH_SECRET=your-random-secret-string-here

# PRODUCTION SETTINGS
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

## 🚀 Deployment Methods

### Method 1: Automated Script (Recommended)

#### For Linux/macOS:
\`\`\`bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment script
./scripts/deploy.sh
\`\`\`

#### For Windows:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Run deployment script
.\scripts\deploy.ps1
