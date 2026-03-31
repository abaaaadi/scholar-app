# Scholar v4 — Complete Setup Guide

## New Features
- ✅ User Registration & Login
- ✅ User Dashboard with usage tracking
- ✅ Free plan limits (5 searches/3 analyses/5 writes per day)
- ✅ Pro plan upgrade page
- ✅ All features locked behind login

---

## STEP 1 — Create free Supabase database (5 min)

1. Go to https://supabase.com → Sign up free
2. Click "New Project" → choose a name → set a password → click Create
3. Wait ~1 minute for project to start
4. Click **SQL Editor** in the left menu
5. Paste the contents of `SUPABASE_SETUP.sql` → click **Run**
6. Go to **Settings** → **API**
7. Copy:
   - **Project URL** (looks like: https://xxxx.supabase.co)
   - **anon/public key** (long string starting with eyJ...)

---

## STEP 2 — Add environment variables to Vercel

Go to Vercel → your project → Settings → Environment Variables

Add ALL of these:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | sk-ant-... (your existing key) |
| `SUPABASE_URL` | https://xxxx.supabase.co |
| `SUPABASE_KEY` | eyJ... (anon/public key) |
| `JWT_SECRET` | any random string (e.g. "my-scholar-secret-2024") |

---

## STEP 3 — Upload files to GitHub

Upload ALL files from this zip to your GitHub repo:
- index.html  (root level)
- vercel.json (root level)
- api/register.js
- api/login.js
- api/me.js
- api/search.js
- api/analyze.js
- api/write.js
- api/_utils.js

Go to Vercel → Deployments → Redeploy

---

## STEP 4 — Test

1. Go to your site URL
2. Click "Register Free" → create an account
3. Try searching for a paper
4. Check Dashboard tab for usage stats
