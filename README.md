# 🎨 Portfolio Website - Ragil Arya

Modern and creative portfolio website dengan animasi interaktif, lightbox gallery, dan bilingual support (EN/ID).

## 📁 Struktur Folder

```
Web-Portofolio/
│
├── index.html          # File HTML utama
├── README.md           # Dokumentasi proyek
│
├── css/
│   └── style.css       # Semua styling CSS
│
├── js/
│   └── script.js       # Semua JavaScript functionality
│
├── images/             # Folder untuk menyimpan gambar portfolio
│   └── (your images here)
│
└── videos/             # Folder untuk menyimpan video portfolio
    └── (your videos here)
```

## ✨ Fitur Utama

### 🎯 Interactive Features
- **Custom Cursor** - Cursor unik dengan follower effect
- **Scroll Progress Bar** - Indikator progress scroll di bagian atas
- **Dark/Light Mode** - Toggle tema dengan animasi smooth + localStorage
- **Bilingual (EN/ID)** - Switch bahasa English/Indonesian
- **Smooth Scroll** - Navigasi smooth antar section

### 🖼️ Portfolio Gallery
- **Filter System** - Filter by All, Design, Video, Photography
- **Lightbox Modal** - Zoom foto/video fullscreen dengan navigation
- **Video Auto-play** - Video play otomatis saat hover
- **Keyboard Navigation** - Arrow keys & Escape untuk lightbox

### 🎨 Animations
- **Particles.js Background** - Efek partikel interaktif di hero section
- **Fade In Up** - Element muncul dengan animasi dari bawah
- **Counter Animation** - Angka statistik naik otomatis
- **Progress Bars** - Skill bars animated saat masuk viewport
- **Image Shine Effect** - Efek shine pada hover image

### 📱 Responsive Design
- Mobile, tablet, desktop optimized
- Touch-friendly interactions
- Adaptive layouts untuk semua screen sizes

## 🚀 Cara Menggunakan

### 1. Setup Awal
1. Download/clone folder project ini
2. Buka `index.html` di browser

### 2. Menambah Portfolio Items

#### Untuk Gambar:
```html
<div class="portfolio-item" data-category="design">
    <img src="images/your-image.jpg" alt="Project Title">
    <div class="portfolio-overlay">
        <h3 class="portfolio-title">Project Title</h3>
        <p class="portfolio-category">Category Name</p>
    </div>
    <i class="fas fa-search-plus portfolio-icon"></i>
</div>
```

#### Untuk Video:
```html
<div class="portfolio-item" data-category="video">
    <video src="videos/your-video.mp4" muted loop></video>
    <div class="portfolio-overlay">
        <h3 class="portfolio-title">Video Title</h3>
        <p class="portfolio-category">Video Production</p>
    </div>
    <i class="fas fa-play portfolio-icon"></i>
</div>
```

**Categories Available:**
- `design` - UI/UX Design projects
- `video` - Video production
- `photo` - Photography
- `all` - Show all items

### 3. Mengganti Konten

#### Informasi Personal (About Section):
Edit di `index.html` section `about`:
```html
<p>Your personal description here...</p>
```

#### Contact Information:
Edit di `index.html` section `contact`:
```html
<p>your-email@example.com</p>
<p>+62 812 3456 7890</p>
<p>Your City, Country</p>
```

#### Social Media Links:
Edit di footer section:
```html
<a href="your-instagram-url"><i class="fab fa-instagram"></i></a>
<a href="your-behance-url"><i class="fab fa-behance"></i></a>
<!-- dll -->
```

### 4. Customize Styling

Edit `css/style.css` untuk mengubah:
- **Colors**: Ubah di CSS Variables (`:root`)
  ```css
  --primary-color: #000;
  --accent-color: #ff6b6b;
  ```
- **Fonts**: Ganti Google Fonts link di `<head>`
- **Animations**: Edit keyframes di bagian Animations

## 🎨 Color Palette

### Light Mode
- Primary: `#000` (Black)
- Secondary: `#fff` (White)
- Accent: `#ff6b6b` (Coral Red)
- Background: `#fff` (White)
- Card BG: `#f8f9fa` (Light Gray)

### Dark Mode
- Primary: `#fff` (White)
- Secondary: `#000` (Black)
- Background: `#0a0a0a` (Dark Gray)
- Card BG: `#1a1a1a` (Darker Gray)

## 📚 Libraries Used

- [Particles.js](https://vincentgarreau.com/particles.js/) - Interactive particles background
- [Font Awesome 6](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography (Playfair Display, Space Grotesk)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📝 Sections Overview

1. **Hero** - Landing section dengan nama dan CTA buttons
2. **About** - Informasi personal + statistics counter
3. **Portfolio** - Gallery dengan filter dan lightbox
4. **Skills** - Progress bars untuk skill levels
5. **Contact** - Form dan contact information
6. **Footer** - Social media links

## 💡 Tips

- **Optimasi Gambar**: Compress gambar sebelum upload untuk loading lebih cepat
- **Video Format**: Gunakan MP4 untuk kompatibilitas maksimal
- **Image Size**: Recommended 1200x900px untuk portfolio items
- **Local Testing**: Gunakan Live Server extension di VS Code untuk testing

## 🐛 Troubleshooting

**Q: Particles tidak muncul?**
A: Pastikan CDN particles.js terload dengan baik (check console)

**Q: Dark mode tidak tersimpan?**
A: Check localStorage di browser settings, pastikan tidak di-disable

**Q: Video tidak autoplay?**
A: Pastikan attribute `muted` ada pada `<video>` tag

## 📄 License

Free to use untuk personal dan commercial projects.

## 👤 Author

**Ragil Arya**
- Website: [Your Website]
- Email: ragilarya@example.com

---

**Made with ❤️ by Ragil Arya**
