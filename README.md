# 🗂️ Personal Portfolio — Alexander Adma Karyadi

> Portofolio personal yang dibangun dengan **React + Vite**, menampilkan proyek, pengalaman kerja, keahlian teknis, dan informasi kontak secara interaktif dengan desain *developer-aesthetic* dark mode.

🌐 **Live Demo:** [alexander-adma.vercel.app](https://alexander-adma.vercel.app)

---

## 📌 Tentang Proyek

Website ini adalah portofolio personal milik **Alexander Adma Karyadi** — Sarjana Informatika (S.Kom) dari Universitas Sanata Dharma Yogyakarta (2025). Dibangun dari nol menggunakan React, portofolio ini dirancang untuk menampilkan identitas profesional, proyek unggulan, serta jalur karier secara elegan dan responsif.

---

## 🛠️ Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Styling** | CSS Custom Properties (CSS Variables), Google Fonts |
| **Fonts** | [Space Mono](https://fonts.google.com/specimen/Space+Mono), [Syne](https://fonts.google.com/specimen/Syne) |
| **Email** | [EmailJS](https://www.emailjs.com/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## ✨ Fitur Utama

- **Intro Animation** — Typewriter effect dengan teks berganti otomatis sebelum memasuki halaman utama
- **Custom Cursor** — Kursor khusus berbentuk dot aksen hijau dengan efek hover expand (desktop only)
- **Sidebar Navigasi** — Navigasi fixed di sisi kiri dengan highlight aktif berdasarkan scroll position
- **Scroll Reveal** — Setiap section muncul dengan animasi fade-in saat di-scroll ke view
- **Mobile Responsive** — Hamburger menu + mobile overlay menu lengkap untuk semua ukuran layar
- **Contact Form** — Form pesan langsung terintegrasi EmailJS, dikirim ke inbox tanpa backend
- **Feedback Widget** — Input feedback cepat di sidebar, juga dikirim via EmailJS
- **Download CV** — Tombol download CV langsung dari halaman
- **WhatsApp CTA** — Quick link chat WhatsApp langsung dari mobile menu

---

## 📂 Struktur Proyek

```
portfolio/
├── public/
│   ├── FotoPP.jpg          # Foto profil
│   └── cv.pdf              # File CV untuk download
├── src/
│   ├── App.jsx             # Komponen utama (semua section)
│   ├── Intro.jsx           # Komponen intro / loading screen
│   ├── styles.css          # Global stylesheet
│   └── main.jsx            # Entry point React
├── index.html
├── vite.config.js
└── package.json
```

---

## 📄 Section Halaman

| # | Section | Deskripsi |
|---|---|---|
| — | **Intro** | Typewriter animation sebelum masuk halaman |
| 01 | **Home** | Hero section dengan nama, bio, CTA, dan code block dekoratif |
| 02 | **About** | Deskripsi diri, nilai-nilai, dan profile card |
| 03 | **Services** | Layanan yang ditawarkan (4 kategori) |
| 04 | **Skills** | Progress bar skill per kategori teknologi |
| 05 | **Education** | Detail pendidikan S1 + skripsi + pencapaian organisasi |
| 06 | **Experience** | Tab panel pengalaman kerja (5 role) |
| 07 | **Projects** | Grid kartu proyek dengan link GitHub/Live |
| 08 | **Contact** | Form kontak + info kontak langsung |

---

## 🚀 Cara Menjalankan Lokal

```bash
# Clone repo
git clone https://github.com/alexadma/portfolio.git
cd portfolio

# Install dependencies
npm install

# Jalankan dev server
npm run dev
```

Buka [http://localhost:5173](http://localhost:5173) di browser.

### Build untuk Production

```bash
npm run build
```

---

## ⚙️ Konfigurasi EmailJS

Form kontak dan feedback menggunakan [EmailJS](https://www.emailjs.com/). Untuk setup sendiri:

1. Buat akun di emailjs.com
2. Buat **Email Service** dan **Email Template**
3. Update konstanta berikut di `src/App.jsx`:

```js
const EJS_SERVICE  = 'your_service_id';
const EJS_TEMPLATE = 'your_template_id';
const EJS_KEY      = 'your_public_key';
```

---

## 🎨 Design System

| Token | Nilai |
|---|---|
| Background | `#080808` |
| Accent | `#c8f04a` (Lime Green) |
| Text | `#ebebeb` |
| Text Dim | `#a0a0a0` |
| Font Mono | Space Mono |
| Font Sans | Syne |

---

## 📱 Responsivitas

| Breakpoint | Layout |
|---|---|
| `> 1100px` | Full sidebar + 2-column grids |
| `900px – 1100px` | Sidebar tersembunyi, layout 1-column |
| `< 900px` | Hamburger menu, experience tabs horizontal scroll |
| `< 600px` | Full mobile: stacked buttons, single column semua |
| `< 380px` | Extra kecil: font size dikurangi lagi |

---

## 📜 Lisensi

Proyek ini bersifat **open source** dan bebas digunakan sebagai referensi atau template.  
Jika menggunakannya, credit ke [Alexander Adma Karyadi](https://alexander-adma.vercel.app) sangat diapresiasi. 🙏

---

## 👤 Author

**Alexander Adma Karyadi**  
📧 [alexadma16@gmail.com](mailto:alexadma16@gmail.com)  
🔗 [linkedin.com/in/alexander-adma](https://www.linkedin.com/in/alexander-adma)  
💻 [github.com/alexadma](https://github.com/alexadma)

---

*Built with React in Kota Sukabumi 🇮🇩*
