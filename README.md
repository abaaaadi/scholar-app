# 📚 Scholar — Academic Research Assistant
### Deploy FREE online in 10 minutes with Vercel

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1 — Create a GitHub account (if you don't have one)
→ Go to https://github.com and sign up (free)

### STEP 2 — Create a new GitHub repository
1. Click the **+** button (top right) → "New repository"
2. Name it: `scholar-app`
3. Set to **Public**
4. Click **Create repository**

### STEP 3 — Upload your files
1. On your new repo page, click **"uploading an existing file"**
2. Upload these files/folders from this ZIP:
   ```
   vercel.json
   public/
     └── index.html
   api/
     ├── search.js
     ├── analyze.js
     └── write.js
   ```
3. Click **Commit changes**

### STEP 4 — Get your Anthropic API Key
1. Go to https://console.anthropic.com
2. Sign up / log in (free)
3. Click **API Keys** in the left menu
4. Click **Create Key**
5. Copy the key — it starts with `sk-ant-...`

### STEP 5 — Deploy on Vercel (free)
1. Go to https://vercel.com and sign up with GitHub (free)
2. Click **"Add New Project"**
3. Import your `scholar-app` repository
4. Click **Deploy** — wait 30 seconds

### STEP 6 — Add your API Key to Vercel
1. In Vercel dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add:
   - Name:  `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-xxxxxxxxxxxxxxxx` (your key)
4. Click **Save**
5. Go to **Deployments** → click **Redeploy** (to apply the env variable)

### STEP 7 — Your site is LIVE! 🎉
Vercel gives you a free URL like:
`https://scholar-app-yourname.vercel.app`

Share it with anyone — it works from any browser, any device!

---

## 📁 File Structure
```
scholar-app/
├── vercel.json          ← Vercel routing config
├── public/
│   └── index.html       ← The entire frontend website
└── api/
    ├── search.js        ← Paper search endpoint
    ├── analyze.js       ← Thesis analysis endpoint
    └── write.js         ← Writing assistant endpoint
```

---

## 💡 Features
| Tab | Description |
|-----|-------------|
| 📚 Guide | 8-phase research methodology + IMRaD structure |
| 🔍 Discover | Search real papers by keyword (AI-powered) |
| 🧠 Analyze | Paste thesis text → extract themes + find papers |
| ✍️ Write | AI guidance for every paper section |
| 🗂 Saved | Save papers + export APA references |

---

## 💰 Cost
- Vercel hosting: **FREE** forever (hobby plan)
- Anthropic API: ~$0.003 per search (very cheap)
  - 100 searches ≈ $0.30

---

## ❓ Troubleshooting

**"Function not found" error** → Check vercel.json is in the root folder

**"API key not set" error** → Go to Vercel Settings → Environment Variables → add key → Redeploy

**Search returns no results** → Try simpler keywords (2-3 words)
