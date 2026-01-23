---
description: Roadmap to deploy the portfolio to Vercel
---

# Deploying Portfolio to Vercel

This workflow guides you through deploying your React/Vite portfolio to Vercel.

## 1. Preparation
We have already created a `vercel.json` file in your project root. This is critical for Single Page Applications (SPAs) like yours to handle routing correctly (so refreshing a page like `/project-demo/audit` doesn't give a 404).

## 2. Install Vercel CLI
If you haven't installed the Vercel CLI yet, you can run:
```bash
npm install -g vercel
```
*Or you can just use `npx vercel` in the commands below.*

## 3. Login to Vercel
You need to authenticate with your Vercel account.
```bash
npx vercel login
```
*Follow the instructions in the terminal (it will likely open your browser).*

## 4. Setup and Deploy
Run the deploy command from your project folder:
```bash
npx vercel
```
- **Set up and deploy?** [Y]
- **Which scope?** [Select your account]
- **Link to existing project?** [N]
- **Project Name?** [portfolio-new] (or your preferred name)
- **In which directory is your code located?** [./]
- **Auto-detected settings:** Vercel should auto-detect Vite.
  - Build Command: `vite build` (or `npm run build`)
  - Output Directory: `dist`
  - Install Command: `npm install`
- **Want to modify these settings?** [N] (Unless Vercel guessed wrong)

## 5. Production Deployment
The previous command creates a "Preview" deployment. To deploy to **Production** (your main live URL):
```bash
npx vercel --prod
```

## 6. Verify
Once finished, Vercel will give you a Production URL (e.g., `https://portfolio-new.vercel.app`).
Visit the link and check:
- Is the custom "MB" icon showing?
- Does the "Visitor Reveal" form work? (It uses localStorage, so it should work fine).
- Do the Demos (Audit, Tournament, Doc) load correctly?
