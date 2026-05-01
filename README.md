# Insighta Web Portal

Web interface for Insighta Labs+.

## Live URL
https://insighta-web-sand.vercel.app

## Tech Stack
- Next.js 15
- Tailwind CSS
- Axios

## Pages
- `/login` — GitHub OAuth login
- `/dashboard` — metrics overview
- `/profiles` — list with filters and pagination
- `/profiles/[id]` — profile detail
- `/search` — natural language search
- `/account` — user info and logout

## Authentication
- GitHub OAuth via backend
- Tokens stored in localStorage
- Auto-refresh on token expiry
- Redirects to login on auth failure

## Environment Variables
NEXT_PUBLIC_API_URL=https://web-production-5347.up.railway.app

## Setup
```bash
npm install
npm run dev
```
## Login Example
1. Go to https://insighta-web-sand.vercel.app/login
2. Click "Login with GitHub"
3. Authorize on GitHub
4. Redirected to dashboard with tokens
## Logout Example
1. Go to https://insighta-web-sand.vercel.app/account
2. Click "Logout"
3. Redirected to login page
## Token Refresh Example
1. Wait for token to expire (15 min)
2. Navigate to any protected page
3. Token auto-refreshed
4. No interruption
## Natural Language Search Example
1. Go to https://insighta-web-sand.vercel.app/search
2. Type: "young males from nigeria"
3. Click search
4. See results
## Dashboard Example
1. Go to https://insighta-web-sand.vercel.app/dashboard
2. See metrics
3. Click "View Profiles"
4. Browse profiles
## Profile Details Example
1. Click on a profile from the list
2. See detailed information
## Account Example
1. Go to https://insighta-web-sand.vercel.app/account
2. See user info
3. Click "Logout"
