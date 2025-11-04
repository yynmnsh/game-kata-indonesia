# 🚀 QUICK START GUIDE

## ✅ You Have Everything You Need!

This zip contains your complete Game Kata Indonesia project.

## 📦 What's Inside

- **index.html** - Main game page
- **styles.css** - All styling
- **README.md** - Full documentation
- **package.json** - Project config
- **.gitignore** - Git ignore rules
- **js/** - All 8 game files
- **data/** - Starter wordlist (500+ words)
- **scripts/** - Word data fetcher

## 🎯 Deploy in 3 Steps

### Step 1: Extract Files
Unzip this file to a folder called `game-kata-indonesia`

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `game-kata-indonesia`
3. Click **Create repository**

### Step 3: Upload & Deploy
```bash
# In your project folder:
git init
git add .
git commit -m "Initial commit - Game Kata Indonesia"
git branch -M main
git remote add origin https://github.com/[YOUR-USERNAME]/game-kata-indonesia.git
git push -u origin main

# Enable GitHub Pages:
# Settings → Pages → Source: main branch → Save
```

**Your game will be live at:**
`https://[YOUR-USERNAME].github.io/game-kata-indonesia/`

## 🎮 Test Locally First

Just open `index.html` in your browser!

Works immediately with 500-word starter list.

## 📥 Get Full Wordlist (Optional)

For 50,000+ Indonesian words:

```bash
node scripts/fetch-words.js
```

This downloads from open sources:
- Wikipedia Indonesia
- Kompas news
- KBBI dictionary

## 🎨 Customize

### Change Colors
Edit `styles.css` line 8:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjust Difficulty
Edit `js/stats.js` in `getGameSettings()`:
```javascript
'katla': { wordLength: 5, maxAttempts: 6 }
```

## 📱 Features

✅ 5 complete games (Katla, Susun Kata, Sarang Kata, Kaitan, TTS Mini)
✅ Auto-generate puzzles
✅ Statistics tracking
✅ Adaptive difficulty
✅ Custom settings
✅ Mobile responsive
✅ No backend needed

## 🐛 Troubleshooting

**Game doesn't load?**
- Open browser console (F12)
- Check for errors

**Need full wordlist?**
- Run: `node scripts/fetch-words.js`
- If it fails, the 500-word fallback still works!

**Deploy issues?**
- Make sure GitHub Pages is enabled
- Wait 2-3 minutes for first deploy
- Check Settings → Pages for status

## 📚 Learn More

Read **README.md** for complete documentation!

---

**Ready? Let's go! 🎮🇮🇩**

1. Extract this zip
2. Open index.html (test locally)
3. Push to GitHub
4. Enable Pages
5. Share with friends!

Selamat bermain! 🎉
