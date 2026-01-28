# Mobile Redeployment Setup Guide

## 📱 How to Redeploy from Your iPhone

### Prerequisites
You need to set up a Vercel token in GitHub secrets (one-time setup).

---

## 🔐 One-Time Setup: Add Vercel Token to GitHub

### Step 1: Get Your Vercel Token
1. Go to https://vercel.com/account/tokens
2. Click **"Create Token"**
3. Name it: `GitHub Actions Token`
4. Click **"Create"**
5. **Copy the token** (you won't see it again!)

### Step 2: Add Token to GitHub
1. Go to your repo: https://github.com/b1aiirrr/GelimPeaceTraders
2. Click **Settings** (top right)
3. Click **Secrets and variables** → **Actions**
4. Click **"New repository secret"**
5. Name: `VERCEL_TOKEN`
6. Value: *Paste the token you copied*
7. Click **"Add secret"**

---

## 🚀 How to Redeploy from iPhone

### Using GitHub Mobile App

1. **Install GitHub App** from App Store
2. **Login** to your account
3. **Go to** `b1aiirrr/GelimPeaceTraders` repo
4. **Tap** the **Actions** tab
5. **Tap** "Manual Redeploy to Vercel"
6. **Tap** "Run workflow"
7. **Tap** green "Run workflow" button
8. Wait 1-2 minutes → Site is redeployed! ✅

---

## 🔔 Uptime Monitoring Setup (Recommended)

### UptimeRobot - FREE Monitoring

1. Go to https://uptimerobot.com
2. Sign up (free)
3. Click **"+ Add New Monitor"**
4. **Monitor Type**: HTTP(s)
5. **Friendly Name**: Gelim Peace Traders
6. **URL**: https://gelim-peace-traders.vercel.app
7. **Monitoring Interval**: 5 minutes
8. **Alert Contacts**: Add your email/phone
9. Click **"Create Monitor"**

Now you'll get alerts if the site goes down!

---

## 📋 What We Fixed

### 1. ✅ `vercel.json` Configuration
- Prevents CDN cache issues
- Ensures proper routing
- Reduces 404 errors

### 2. ✅ GitHub Actions Workflow
- Manual trigger from mobile
- Automatic Vercel deployment
- Works from anywhere

---

## Troubleshooting

**Q: Workflow fails with "VERCEL_TOKEN not found"**  
**A:** You need to complete the one-time setup above to add the Vercel token to GitHub secrets.

**Q: Can I automate this on every commit?**  
**A:** Yes! I can modify the workflow to auto-deploy on every push to main branch.

**Q: Does this cost money?**  
**A:** No! GitHub Actions and Vercel both have generous free tiers.
