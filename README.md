# 🎮 Game Kata Indonesia

Koleksi 5 game kata bahasa Indonesia yang menyenangkan dan edukatif. Semua game berjalan di browser tanpa perlu server!

## 🕹️ Game yang Tersedia

1. **Katla** - Tebak kata 5 huruf (seperti Wordle)
2. **Susun Kata** - Bentuk kata dari kotak huruf (Letter Box)
3. **Sarang Kata** - Buat kata dari 7 huruf (Spelling Bee)
4. **Kaitan** - Kelompokkan kata yang berhubungan (Connections)
5. **TTS Mini** - Teka-teki silang mini

## ✨ Fitur

- ✅ **Auto-generate puzzle** - Puzzle baru setiap selesai bermain
- ✅ **Statistik pemain** - Lacak win rate, streak, dan performa
- ✅ **Adaptive difficulty** - Kesulitan menyesuaikan dengan kemampuan
- ✅ **Pengaturan kustom** - Sesuaikan setiap game sesuai selera
- ✅ **Responsive design** - Tampil sempurna di desktop & mobile
- ✅ **Offline-capable** - Bekerja tanpa internet setelah dimuat
- ✅ **No backend needed** - Pure HTML/CSS/JavaScript

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/[username]/game-kata-indonesia.git
cd game-kata-indonesia
```

### 2. Pilih Salah Satu:

#### Opsi A: Gunakan Fallback Wordlist (Cepat, ~500 kata)

Langsung buka `index.html` di browser. Game sudah bisa dimainkan!

```bash
# Buka di browser
open index.html  # Mac
start index.html # Windows
xdg-open index.html # Linux
```

#### Opsi B: Download Full Wordlist (Rekomendasi, 50,000+ kata)

```bash
# Install dependencies (hanya Node.js diperlukan)
npm install

# Jalankan fetcher script
node scripts/fetch-words.js

# Buka game
open index.html
```

Script akan otomatis download data kata dari:
- Wikipedia Indonesia (frequency data)
- Kompas (news corpus)
- KBBI (Kamus Besar Bahasa Indonesia)

## 📁 Struktur Folder

```
game-kata-indonesia/
├── index.html              # Main HTML file
├── styles.css              # Styling
├── data/
│   └── wordlists.js        # Word database
├── js/
│   ├── main.js             # App controller
│   ├── utils.js            # Utility functions
│   ├── stats.js            # Statistics management
│   ├── katla.js            # Katla game
│   ├── susun-kata.js       # Susun Kata game
│   ├── sarang-kata.js      # Sarang Kata game
│   ├── kaitan.js           # Kaitan game
│   └── tts-mini.js         # TTS Mini game
└── scripts/
    └── fetch-words.js      # Word data fetcher
```

## 🌐 Deploy ke GitHub Pages

### 1. Push ke GitHub

```bash
git add .
git commit -m "Initial commit - Game Kata Indonesia"
git push origin main
```

### 2. Enable GitHub Pages

1. Buka repository di GitHub
2. Klik **Settings** → **Pages**
3. Source: pilih `main` branch
4. Klik **Save**

Game akan live di: `https://[username].github.io/game-kata-indonesia/`

### 3. (Opsional) Custom Domain

Tambahkan file `CNAME` dengan domain kamu:

```bash
echo "game-kata.example.com" > CNAME
git add CNAME
git commit -m "Add custom domain"
git push
```

Lalu setting DNS:
```
Type: CNAME
Name: game-kata
Value: [username].github.io
```

## 🔧 Kustomisasi

### Ubah Pengaturan Default

Edit di `js/stats.js`, fungsi `getGameSettings()`:

```javascript
'katla': {
    wordLength: 5,      // Ubah panjang kata
    maxAttempts: 6,     // Ubah jumlah percobaan
    hardMode: false
}
```

### Tambah Sumber Data Kata

Edit `scripts/fetch-words.js`, tambahkan di array `sources`:

```javascript
{
    name: 'Nama Sumber',
    url: 'https://url-data-kata.com/wordlist.txt',
    parser: parseSimpleList  // atau parseFrequencyCSV
}
```

### Ubah Tema Warna

Edit `styles.css`, ubah gradient background:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    /* Ganti dengan warna favoritmu */
}
```

## 📊 Cara Kerja Auto-Generate

### Katla (Wordle)
- Pilih random kata dari wordlist sesuai panjang setting
- Validasi guess menggunakan full wordlist
- Difficulty scaling berdasarkan win rate player

### Susun Kata (Letter Box)
- Generate kombinasi huruf dengan algoritma:
  - Pastikan ada vokal & konsonan seimbang
  - Cek minimal 15 kata valid bisa dibentuk
  - Letakkan huruf di 3-4 sisi kotak

### Sarang Kata (Spelling Bee)
- Pilih 1 huruf tengah (wajib)
- Pilih 6 huruf luar
- Filter kata yang mengandung huruf tengah
- Minimal 20 kata valid

### Kaitan (Connections)
- Pre-defined categories dengan semantic grouping
- Shuffle posisi kata di grid
- Track mistakes dan validate grouping

### TTS Mini (Crossword)
- Simplified 5×5 atau 7×7 grid
- Pre-made clues dan answers
- Future: auto-generate dari word graph

## 🎯 Adaptive Difficulty

System otomatis adjust kesulitan berdasarkan performa:

| Win Rate | Level | Adjustment |
|----------|-------|------------|
| < 40% | Beginner | Kata lebih mudah, lebih banyak attempt |
| 40-60% | Intermediate | Setting default |
| 60-80% | Advanced | Kata lebih sulit |
| > 80% | Expert | Challenge mode |

## 📱 Mobile Optimization

- Touch-friendly buttons
- Responsive grid layouts
- Optimized untuk layar 375px - 1920px
- Swipe gestures (future feature)

## 🐛 Troubleshooting

### Game tidak load?

Cek browser console (F12). Jika ada error "WORDLISTS is not defined":

```bash
node scripts/fetch-words.js
```

### Script fetch error 403?

Beberapa sumber mungkin block akses. Solusi:
1. Gunakan VPN
2. Download manual dan parse sendiri
3. Gunakan fallback wordlist (sudah cukup untuk main)

### Puzzle terlalu mudah/sulit?

Adjust di menu Pengaturan (⚙️) untuk setiap game.

## 🤝 Kontribusi

Contributions welcome! Beberapa ide:

- [ ] Tambah game baru (Anagram, Word Search, dll)
- [ ] Improve puzzle generation algorithm
- [ ] Add sound effects & animations
- [ ] Leaderboard dengan localStorage sync
- [ ] PWA support (offline mode)
- [ ] Multi-language support (English, Javanese, dll)

## 📄 Lisensi

MIT License - feel free to use, modify, and distribute!

## 🙏 Credits

- Word data dari:
  - [ardwort/freq-dist-id](https://github.com/ardwort/freq-dist-id)
  - [Wikidepia/indonesian_datasets](https://github.com/Wikidepia/indonesian_datasets)
  - KBBI (Kamus Besar Bahasa Indonesia)

- Inspirasi game dari NY Times Games

## 📞 Support

Ada pertanyaan? Buka [Issues](https://github.com/[username]/game-kata-indonesia/issues)

---

**Selamat bermain! 🎮🇮🇩**
