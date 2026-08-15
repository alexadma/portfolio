import React, { useState, useEffect, useCallback, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './styles.css';

// ─── EMAILJS CONFIG ─────────────────────────────────────────────────
const EJS_SERVICE = 'service_nqe11s2';
const EJS_TEMPLATE = 'template_1welqjv';
const EJS_FEEDBACK = 'template_1welqjv';
const EJS_KEY = 'ZWD3pIbVpDewDruZt';

/* ─── DATA ────────────────────────────────────────────────────────── */
const SKILLS = {
  'Programming': [
    { name: 'Python', level: 85 },
    { name: 'PHP', level: 88 },
    { name: 'JavaScript', level: 80 },
    { name: 'HTML & CSS', level: 90 },
  ],
  'Backend': [
    { name: 'Laravel', level: 90 },
    { name: 'CodeIgniter', level: 75 },
    { name: 'REST API', level: 60 },
    { name: 'RBAC / Auth', level: 90 },
  ],
  'Frontend': [
    { name: 'Tailwind CSS', level: 88 },
    { name: 'Alpine.js', level: 80 },
    { name: 'UI/UX', level: 90 },
    { name: 'React', level: 65 },
  ],
  'Database': [
    { name: 'MySQL', level: 85 },
    { name: 'phpMyAdmin', level: 82 },
  ],
  'AI & Computer Vision': [
    { name: 'YOLO', level: 95 },
    { name: 'RCNN', level: 75 },
    { name: 'Roboflow', level: 95 },
    { name: 'OpenCV', level: 90 },
  ],
  'Tools & DevOps': [
    { name: 'Git', level: 82 },
    { name: 'Figma', level: 85 },
    { name: 'VPS / Linux', level: 80 },
    { name: 'Hostinger', level: 75 },
  ],
};

const EXPERIENCES = [
  {
    role: 'Full Stack Developer',
    company: 'Website Development Project',
    location: 'Yogyakarta',
    period: 'Oct 2025 – Present',
    type: 'Freelance',
    highlights: [
      'Mengembangkan dan memelihara aplikasi web enterprise berbasis Laravel dengan fokus pada performa, keamanan, dan skalabilitas sistem.',
      'Mengimplementasikan desain UI/UX responsif dari wireframe Figma menjadi antarmuka web interaktif menggunakan Tailwind CSS dan Alpine.js.',
      'Merancang dan mengoptimalkan struktur database MySQL serta membangun dashboard admin multi-level untuk visualisasi laporan dan monitoring sistem.',
      'Melakukan deployment ke VPS & Hostinger, mengonfigurasi Tailscale untuk akses jaringan aman, dan setup perangkat keras NVR, CCTV, serta Router dalam ekosistem monitoring terintegrasi.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Freelance / Project Based',
    location: 'Yogyakarta',
    period: 'Oct 2025 – Present',
    type: 'Freelance',
    highlights: [
      'Merancang antarmuka pengguna (UI) di Figma dengan prioritas pada visual hierarchy dan pengalaman pengguna (UX) yang intuitif dan efisien.',
      'Menyusun User Flow, Sitemap, dan prototipe interaktif high-fidelity untuk memvalidasi alur navigasi sebelum masuk tahap pengembangan.',
      'Mengembangkan identitas visual dan desain logo yang representatif untuk memperkuat branding digital klien.',
      'Mengintegrasikan elemen fungsional seperti QR Code dan aset visual operasional ke dalam sistem desain.',
    ],
  },
  {
    role: 'Beta Tester',
    company: 'Game Studio (Roblox)',
    location: 'Yogyakarta',
    period: 'Nov – Des 2024',
    type: 'Contract',
    highlights: [
      'Melakukan pengujian fungsional sistematis pada game berbasis Roblox, mencakup testing map, mekanisme gameplay, dan edge case scenarios.',
      'Mengidentifikasi, mendokumentasikan, dan melaporkan bug serta glitch secara terstruktur kepada tim developer.',
      'Menyampaikan feedback teknis berbasis pengalaman pengguna untuk peningkatan stabilitas dan kualitas UX game.',
    ],
  },
  {
    role: 'Table Officials Shot Clock',
    company: 'IBL 3x3 Event',
    location: 'Yogyakarta',
    period: 'May 2024',
    type: 'Contract',
    highlights: [
      'Shot Clock Operator mengoperasikan perangkat pengatur waktu terpisah.',
      'Melakukan koordinasi real-time dengan wasit lapangan dan rekan table officials (Scorer & Game Clock) untuk memastikan integritas data skor dan waktu pertandingan tetap akurat.',
      'Menjaga kepatuhan terhadap regulasi teknis pertandingan, termasuk penentuan waktu mati (dead ball), situasi reset jam, dan pergantian pemain di bawah tekanan tempo permainan 3x3 yang sangat cepat.',
    ],
  },
  {
    role: 'Content Creator & Streamer',
    company: 'YouTube Live',
    location: 'Sukabumi',
    period: 'Jun 2021 – Jan 2024',
    type: 'Self-employed',
    highlights: [
      'Melakukan live streaming gaming secara rutin dan membangun audiens organik di platform YouTube.',
      'Membuat aset visual berkualitas (thumbnail, banner) menggunakan Adobe Photoshop untuk meningkatkan CTR konten.',
      'Menulis script konten terstruktur dan mengedit video menggunakan Adobe Premiere Pro untuk menghasilkan konten yang engaging.',
    ],
  },
];

const PROJECTS = [
  {
    num: '01',
    title: 'AI Basketball Score Counter',
    subtitle: 'Undergraduate Thesis · Computer Vision',
    desc: 'Sistem deteksi dan penghitungan skor bola basket secara real-time menggunakan YOLO. Model dilatih dengan dataset custom dari Roboflow dan diimplementasikan dengan OpenCV untuk analisis video live maupun rekaman, tanpa memerlukan operator manual.',
    tech: ['Python', 'YOLO', 'OpenCV', 'Roboflow', 'Deep Learning'],
    highlight: 'Thesis',
    link: 'https://github.com/alexadma/AI-Computer-Vision',
    github: 'https://github.com/alexadma/AI-Computer-Vision',
  },
  {
    num: '02',
    title: 'Personal Portfolio Website',
    subtitle: 'React · UI/UX Design · Open Source',
    desc: 'Website portofolio personal yang dibangun dengan React, menampilkan proyek, pengalaman, dan keahlian secara interaktif. Dilengkapi custom cursor, animasi scroll reveal, sidebar navigasi responsif, dan mobile menu didesain dengan pendekatan developer-aesthetic.',
    tech: ['React', 'JavaScript', 'CSS', 'Vite', 'Responsive Design'],
    highlight: 'Personal Project',
    link: 'https://alexander-adma.vercel.app/',
    github: 'https://github.com/alexadma/portfolio',
  },
  {
    num: '03',
    title: 'DJVR Rent Car Website',
    subtitle: 'Laravel Full Stack · Personal Project · Open Source',
    desc: 'Website rental mobil dengan sistem booking dan manajemen mobil berbasis Laravel. Dilengkapi fitur login, dashboard admin, dan integrasi payment gateway.',
    tech: ['Laravel', 'MySQL', 'PHP', 'Tailwind CSS', 'Alpine.js'],
    highlight: 'Personal Project',
    link: null,
    github: 'https://github.com/alexadma/proyek-rent-mobil',
    linkLabel: 'in repair',
  },
  {
    num: '04',
    title: 'Padel Live Streaming Website',
    subtitle: 'Laravel Full Stack · Server & Networking · Client Work',
    desc: 'Konfigurasi dan integrasi infrastruktur jaringan aman: deployment aplikasi Laravel ke VPS Linux, konfigurasi & SSL, setup Tailscale VPN untuk remote access, dan integrasi hardware monitoring (NVR, CCTV, Router). Source code bersifat confidential milik klien.',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'VPS', 'Tailscale', 'Hostinger', 'SSL'],
    highlight: 'Client Work',
    link: 'https://geta-app.tv',
    github: null,
  },
  {
    num: '05',
    title: 'Resto Cafe System Infrastructure',
    subtitle: 'Laravel Full Stack · Client Work',
    desc: 'Aplikasi web enterprise dengan sistem Role-Based Access Control (RBAC) multi-level, dashboard admin yang kaya fitur, manajemen data dinamis dan visualisasi laporan via web interface. Source code bersifat confidential milik klien.',
    tech: ['Laravel', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'Hostinger', 'SSL'],
    highlight: 'Client Work',
    link: 'https://legareca-space.id',
    github: null,
  },
  {
    num: '06',
    title: 'AI Content Generator',
    subtitle: 'Laravel + AI Text Generation · Open Source',
    desc: 'Aplikasi web AI untuk generate konten teks otomatis dari prompt user. Menggunakan Laravel backend dengan integrasi AI API untuk menghasilkan artikel, caption sosial media, dan konten marketing. Fitur: real-time preview, history generation, copy-to-clipboard, dan responsive UI.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'Alpine.js', 'AI API Integration', 'JavaScript'],
    highlight: 'Personal Project',
    link: null, // Belum ada live demo
    github: 'https://github.com/alexadma/ai-content-generator',
  },
  {
    num: '07',
    title: 'AI Car Counted Detection',
    subtitle: 'Computer Vision · Open Source',
    desc: 'Aplikasi computer vision untuk mendeteksi dan menghitung jumlah kendaraan menggunakan teknologi YOLO 12 dan deep learning. Fitur: real-time detection, counting accuracy, dan visualisasi hasil.',
    tech: ['Python', 'OpenCV', 'YOLO', 'Deep Learning', 'Streamlit'],
    highlight: 'Personal Project',
    link: 'https://youtu.be/FiZLmGX7uZ8',
    github: 'https://github.com/alexadma/CarCounting',
  }
];

const SERVICES = [
  { icon: '⚙️', title: 'Full Stack Web Development', desc: 'Membangun aplikasi web end-to-end dengan Laravel & MySQL arsitektur solid, backend scalable, dan frontend responsif yang siap production.' },
  { icon: '🧠', title: 'Computer Vision & AI', desc: 'Implementasi sistem deteksi objek real-time dan klasifikasi visual menggunakan YOLO dan deep learning untuk otomasi dan analisis visual.' },
  { icon: '🎨', title: 'UI/UX Design (Figma)', desc: 'Merancang pengalaman pengguna intuitif dan visual profesional dari wireframe, User Flow, hingga prototipe interaktif siap handoff.' },
  { icon: '🖥️', title: 'Server & Deployment', desc: 'Setup VPS Linux, konfigurasi & SSL, deployment Laravel, manajemen domain, dan integrasi jaringan aman menggunakan Tailscale.' },
];

const STATS = [
  { num: '2025', label: 'S.Kom Graduate' },
  { num: '5+', label: 'Roles & Projects' },
  { num: '1+', label: 'Years of Work Experience' },
];

const THESIS_VIDEOS = [
  { id: 'q__Yi-kaCfA', model: 'YOLOv8m', config: 'SGD · lr=0.0001 · m=0.999', badge: 'v8' },
  { id: 'UFADDCNM1QI', model: 'YOLOv8m', config: 'SGD · lr=0.01 · m=0.937', badge: 'v8' },
  { id: 'zr9qI1wKQLY', model: 'YOLOv9m', config: 'SGD · lr=0.0001 · m=0.999', badge: 'v9' },
  { id: 'yrcvjhXfmmY', model: 'YOLOv9m', config: 'SGD · lr=0.01 · m=0.937', badge: 'v9' },
];

const HERO_VIDEO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4';

const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0);

/* ─── LOGO COMPONENT ──────────────────────────────────────────────── */
function GrowupLogo({ className, style, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <button
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={style}
      aria-label="Growup - Home"
    >
      <img
        src="/Growup.jpg"
        alt="Growup"
        className="nav-logo-img"
        onError={(e) => {
          // Fallback jika gambar belum ada
          e.target.style.display = 'none';
          e.target.nextSibling.style.display = 'inline';
        }}
      />
      <span className="nav-logo-fallback" style={{ display: 'none' }}>
        <span className="logo-lt">&lt;</span>Growup<span className="logo-lt">/&gt;</span>
      </span>
    </button>
  );
}

/* ─── COMPONENT ───────────────────────────────────────────────────── */
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [activeExpIndex, setActiveExpIndex] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSent, setContactSent] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactError, setContactError] = useState('');

  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const expTabsRef = useRef(null);
  const expTabRefs = useRef([]);

  const sections = ['home', 'about', 'services', 'skills', 'education', 'experience', 'projects', 'contact'];
  const NAV_LINKS = ['Home', 'About', 'Services', 'Skills', 'Education', 'Experience', 'Projects', 'Contact'];

  useEffect(() => { setIsTouch(isTouchDevice()); }, []);

  useEffect(() => {
    if (isTouch) return;

    const move = (e) => {
      // Langsung update posisi tanpa delay
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    // Throttle untuk performa lebih baik
    let ticking = false;
    const throttledMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          move(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMove);
    return () => window.removeEventListener('mousemove', throttledMove);
  }, [isTouch]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          setActiveSection(e.target.id);
          setVisibleSections((p) => new Set([...p, e.target.id]));
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );
    sections.forEach((s) => { const el = document.getElementById(s); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  }, []);

  const handleExpTabClick = useCallback((index) => {
    setActiveExpIndex(index);
    const tabEl = expTabRefs.current[index];
    const containerEl = expTabsRef.current;
    if (tabEl && containerEl) {
      const containerWidth = containerEl.offsetWidth;
      const tabLeft = tabEl.offsetLeft;
      const tabWidth = tabEl.offsetWidth;
      const scrollTarget = tabLeft - containerWidth / 2 + tabWidth / 2;
      containerEl.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }
  }, []);

  const isVis = (id) => visibleSections.has(id);
  const hoverOn = () => !isTouch && setHovering(true);
  const hoverOff = () => !isTouch && setHovering(false);
  const cur = isTouch ? 'pointer' : 'none';

  const handleContact = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) return;
    setContactLoading(true);
    setContactError('');
    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
        name: contactName,
        email: contactEmail,
        title: contactSubject || 'Tidak ada keperluan dipilih',
        message: contactMsg,
        time: new Date().toLocaleString('id-ID'),
      }, EJS_KEY);
      setContactSent(true);
      setContactName(''); setContactEmail(''); setContactSubject(''); setContactMsg('');
      setTimeout(() => setContactSent(false), 5000);
    } catch (err) {
      setContactError('Gagal mengirim pesan. Silakan coba lagi.');
      console.error('EmailJS error:', err);
    } finally {
      setContactLoading(false);
    }
  };

  const handleFeedback = async (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setFeedbackLoading(true);
    try {
      await emailjs.send(EJS_SERVICE, EJS_FEEDBACK, {
        name: 'Anonymous (Footer)',
        email: 'no-reply@portfolio.dev',
        title: 'Footer Feedback',
        message: feedbackText,
        time: new Date().toLocaleString('id-ID'),
      }, EJS_KEY);
      setFeedbackSent(true);
      setFeedbackText('');
      setTimeout(() => setFeedbackSent(false), 3000);
    } catch (err) {
      console.error('Feedback error:', err);
    } finally {
      setFeedbackLoading(false);
    }
  };

  const activeVideo = THESIS_VIDEOS[activeVideoIndex];

  return (
    <div className="app">

      {/* ── CUSTOM CURSOR ─────────────────────────────────────────── */}
      {!isTouch && (
        <>
          <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
          <div className={`cursor-ring ${hovering ? 'hovering' : ''}`} style={{ left: cursorPos.x, top: cursorPos.y }} />
        </>
      )}

      {/* ══ FLOATING TOP NAV ══════════════════════════════════════ */}
      <header className={`top-nav ${scrolled ? 'top-nav--scrolled' : ''}`}>
        <div className="top-nav-inner">

          {/* ── LOGO: Growup.jpg ── */}
          <GrowupLogo
            className="top-nav-logo top-nav-logo--img"
            onClick={() => scrollTo('home')}
            onMouseEnter={hoverOn}
            onMouseLeave={hoverOff}
            style={{ cursor: cur }}
          />

          <nav className="top-nav-links">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                className={`top-nav-link ${activeSection === link.toLowerCase() ? 'active' : ''}`}
                onClick={() => scrollTo(link.toLowerCase())}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                style={{ cursor: cur }}
              >
                {link}
              </button>
            ))}
          </nav>

          <div className="top-nav-actions">
            <div className="avail-pill">
              <span className="avail-dot" />Open to Work
            </div>
            <a href="cv.pdf" download="Alexander_Adma_CV.pdf" className="nav-cta-btn"
              onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
              Download CV
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ cursor: 'pointer' }}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ── MOBILE MENU ───────────────────────────────────────────── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          {/* Mobile logo juga pakai Growup */}
          <button className="mobile-logo" onClick={() => scrollTo('home')} style={{ cursor: 'pointer' }}>
            <img
              src="/Growup.jpg"
              alt="Growup"
              className="mobile-logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'inline';
              }}
            />
            <span style={{ display: 'none' }}>
              <span className="logo-lt">&lt;</span>Growup<span className="logo-lt">/&gt;</span>
            </span>
          </button>
          <div className="mobile-avail">
            <span className="avail-dot" />Open to Work
          </div>
          <nav className="mobile-nav">
            {sections.map((s, i) => (
              <button key={s} className="mobile-nav-link" onClick={() => scrollTo(s)}
                style={{ cursor: 'pointer', animationDelay: `${i * 0.05}s` }}>
                <span className="mnl-num">0{i + 1}</span>
                <span className="mnl-label">{s}</span>
              </button>
            ))}
          </nav>
          <div className="mobile-footer-actions">
            <a href="cv.pdf" download className="mob-btn primary">⬇ Download CV</a>
            <a href="https://wa.me/6282227175851" target="_blank" rel="noreferrer" className="mob-btn wa">💬 WhatsApp</a>
            <a href="mailto:alexadma16@gmail.com" className="mob-btn outline">✉ Hire Me</a>
          </div>
          <p className="mobile-contact-txt">alexadma16@gmail.com · 0822-2717-5851</p>
        </div>
      </div>

      {/* ── MAIN ──────────────────────────────────────────────────── */}
      <main className="main-content">

        {/* ══ HERO ═════════════════════════════════════════════════ */}
        <section id="home" className="hero-section">
          <video className="hero-video" src={HERO_VIDEO} autoPlay loop muted playsInline />
          <div className="hero-scrim" />

          {/* Floating particles */}
          <div className="hero-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="particle" style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }} />
            ))}
          </div>

          <div className="hero-body">
            <div className="hero-tag animate-pop-in">✦ Full Stack · AI · UI/UX</div>
            <h1 className="hero-headline animate-pop-in-delay">
              Where <em className="hero-em">dreams</em> rise<br />
              <em className="hero-em-2">starting with a single step.</em>
            </h1>

            {/* ── HERO SUBTEXT — disesuaikan tema portofolio profesional ── */}
            <p className="hero-subtext animate-pop-in-delay-2">
              Full Stack Developer & AI Engineer yang membangun solusi end-to-end, dari arsitektur backend hingga implementasi AI berbasis computer vision, dengan fokus pada performa dan pengalaman pengguna.
            </p>

            <div className="hero-ctas animate-pop-in-delay-3">
              <button className="hero-cta-primary liquid-glass"
                onClick={() => scrollTo('about')}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                style={{ cursor: cur }}>
                Lihat Portofolio ↓
              </button>
              <button className="hero-cta-ghost"
                onClick={() => scrollTo('contact')}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                style={{ cursor: cur }}>
                Hubungi Saya →
              </button>
            </div>

            {/* Stats bar */}
            <div className="hero-stats animate-pop-in-delay-4">
              {STATS.map((s, i) => (
                <div key={i} className="hero-stat">
                  <span className="hero-stat-num">{s.num}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="scroll-indicator">
            <div className="scroll-line" />
            <span>scroll</span>
          </div>
        </section>

        {/* ══ ABOUT ════════════════════════════════════════════════ */}
        <section id="about" className={`section reveal ${isVis('about') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">01.</span>
            <h2 className="section-title">About Me</h2>
            <div className="section-line" />
          </div>
          <div className="about-grid">
            <div className="about-text-col">
              <p className="about-lead">
                Halo! Saya <strong>Alexander Adma Karyadi</strong> — Sarjana Informatika yang
                terjun dalam bidang <em>AI Engineer</em> berbasis <em>Computer Vision</em> dan <em>Full Stack Development</em>.
              </p>
              <p>
                Di <strong>Universitas Sanata Dharma Yogyakarta</strong>, saya tidak hanya membangun
                fondasi teknis yang solid — saya juga membuktikannya. Skripsi saya mengimplementasikan
                <strong> AI Computer Vision berbasis YOLO</strong> untuk mendeteksi bola basket dan
                menghitung skor secara otomatis, tanpa operator manual.
              </p>
              <p>
                Saat ini saya aktif sebagai <strong>Full Stack Developer</strong> dan <strong>UI/UX
                  Designer</strong> — membangun sistem web enterprise berbasis Laravel, merancang user
                flow di Figma, dan mengelola infrastruktur server pada VPS.
              </p>
              <p>
                Saya percaya <em>kode terbaik lahir dari empati terhadap pengguna</em> — dan
                pengalaman memimpin organisasi kemahasiswaan mengajarkan saya bahwa teknologi harus
                selalu memberikan nilai nyata bagi orang-orang yang menggunakannya.
              </p>
              <div className="about-values">
                {[
                  { icon: '⚡', title: 'Fast Learner', desc: 'Cepat beradaptasi dengan stack, tools, dan domain baru dari Laravel ke YOLO, dari UI ke server config.' },
                  { icon: '🎯', title: 'End-to-End Builder', desc: 'Terbiasa menangani proyek dari nol: desain, development, deployment, hingga troubleshooting hardware.' },
                  { icon: '🤝', title: 'Leader & Collaborator', desc: 'Pernah memimpin koordinasi basket tingkat universitas — kolaborasi lintas divisi bukan hal asing.' },
                ].map((v, i) => (
                  <div key={v.title} className="value-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    <span className="value-icon">{v.icon}</span>
                    <div><strong>{v.title}</strong><p>{v.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-sidebar">
              <div className="profile-card-box">
                <div className="profile-avatar-wrap">
                  <div className="profile-avatar">
                    <img src="/FotoPP.jpg" alt="Alexander Adma Karyadi" />
                  </div>
                  <div className="profile-avatar-ring" />
                </div>
                <div className="profile-name">Alexander Adma Karyadi</div>
                <div className="profile-role">Full Stack · UI/UX · Computer Vision</div>
                <div className="profile-divider" />
                <div className="profile-info-list">
                  {[
                    ['Degree', 'S.Kom Informatika'],
                    ['University', 'Sanata Dharma, Yogyakarta'],
                    ['Status', 'Fresh Graduate (2025)'],
                    ['Location', 'Yogyakarta, Indonesia'],
                    ['Email', 'alexadma16@gmail.com'],
                  ].map(([k, v]) => (
                    <div key={k} className="pil-item">
                      <span className="pil-key">{k}</span>
                      <span className="pil-val">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="profile-divider" />
                <div className="profile-social">
                  <a href="https://www.linkedin.com/in/alexander-adma" target="_blank" rel="noreferrer"
                    className="social-btn" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                  <a href="mailto:alexadma16@gmail.com"
                    className="social-btn" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email Me
                  </a>
                  <a href="https://wa.me/6282227175851" target="_blank" rel="noreferrer"
                    className="social-btn social-btn--wa" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ═════════════════════════════════════════════ */}
        <section id="services" className={`section reveal ${isVis('services') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">02.</span>
            <h2 className="section-title">What I Do</h2>
            <div className="section-line" />
          </div>
          <p className="section-intro">Saya menawarkan solusi digital menyeluruh — dari ideasi, desain, development, hingga deployment.</p>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                <div className="service-icon-wrap">{s.icon}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-card-glow" />
              </div>
            ))}
          </div>
        </section>

        {/* ══ SKILLS ═══════════════════════════════════════════════ */}
        <section id="skills" className={`section reveal ${isVis('skills') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">03.</span>
            <h2 className="section-title">Technical Skills</h2>
            <div className="section-line" />
          </div>
          <p className="section-intro">Stack teknologi yang saya kuasai dan gunakan secara aktif dalam membangun produk digital:</p>
          <div className="skills-grid">
            {Object.entries(SKILLS).map(([cat, items], ci) => (
              <div key={cat} className="skill-category" style={{ animationDelay: `${ci * 0.08}s` }}>
                <h3 className="skill-cat-title"><span className="cat-arrow">▸</span> {cat}</h3>
                <div className="skill-items">
                  {items.map((skill, si) => (
                    <div key={skill.name} className="skill-row">
                      <div className="skill-row-top">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-pct">{skill.level}%</span>
                      </div>
                      <div className="skill-bar-track">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: isVis('skills') ? `${skill.level}%` : '0%',
                            transitionDelay: `${(ci * 4 + si) * 0.06}s`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ EDUCATION ════════════════════════════════════════════ */}
        <section id="education" className={`section reveal ${isVis('education') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">04.</span>
            <h2 className="section-title">Education</h2>
            <div className="section-line" />
          </div>
          <div className="edu-main-card">
            <div className="edu-header-row">
              <div>
                <div className="edu-badge-pill">Bachelor's Degree · S1</div>
                <h3 className="edu-degree">Sarjana Informatika (S.Kom)</h3>
                <p className="edu-school">Universitas Sanata Dharma · Yogyakarta, Indonesia</p>
              </div>
              <span className="edu-period-badge">Aug 2021 – Aug 2025</span>
            </div>
            <div className="edu-body">
              <div className="edu-thesis-box">
                <div className="edu-thesis-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Undergraduate Thesis
                </div>
                <p className="edu-thesis-title">
                  DETEKSI OBJEK UNTUK MEMANTAU KEAKURATAN TEMBAKAN DALAM LATIHAN INDIVIDU OLAHRAGA BASKET BERBASIS ALGORITMA YOLO
                </p>
                <p className="edu-thesis-sub">
                  Menggunakan algoritma YOLO dan OpenCV dengan dataset custom yang dilatih melalui platform Roboflow.
                  Sistem mampu mendeteksi bola dan menentukan kejadian skor tanpa operator manual.
                </p>
                <div className="edu-thesis-tech">
                  {['Python', 'TensorFlow', 'YOLO', 'OpenCV', 'Roboflow', 'ultralytics', 'Deep Learning', 'Computer Vision'].map(t => (
                    <span key={t} className="eth-chip">{t}</span>
                  ))}
                </div>
              </div>
              <div className="edu-activities">
                <div className="edu-act-title">Organizational Achievements</div>
                <div className="edu-act-grid">
                  {[
                    { icon: '🏀', text: 'MVP Basketball Ngejaman Cup 3.0' },
                    { icon: '🥇', text: 'Juara 1 3x3 Basketball Ngejaman Cup 3.0' },
                    { icon: '🎮', text: 'Juara 2 E-sport Valorant tingkat Fakultas' },
                    { icon: '👥', text: 'Coordinator UKM Basket Universitas Sanata Dharma (2023–2024)' },
                    { icon: '🏆', text: 'Coordinator Acara Turnamen Basket antar Fakultas (2023)' },
                    { icon: '📋', text: 'Divisi Humas Dialog Orang Tua FST (2023)' },
                    { icon: '📚', text: 'Aktif mengikuti seminar & workshop teknologi nasional' },
                  ].map((a, i) => (
                    <div key={i} className="edu-act-item">
                      <span className="edu-act-icon">{a.icon}</span>
                      <span>{a.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── THESIS DEMO VIDEOS ── */}
            <div className="tv-section">
              <div className="tv-section-label">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                YOLO Object Detection — Thesis Results
              </div>
              <div className="tv-body">
                <div className="tv-tabs">
                  {THESIS_VIDEOS.map((v, i) => (
                    <button
                      key={v.id}
                      className={`tv-tab ${activeVideoIndex === i ? 'active' : ''}`}
                      onClick={() => setActiveVideoIndex(i)}
                      onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                      style={{ cursor: cur }}
                    >
                      <span className={`tv-tab-badge badge-${v.badge}`}>{v.model}</span>
                      <span className="tv-tab-config">{v.config}</span>
                    </button>
                  ))}
                </div>
                <div className="tv-player-wrap">
                  <div className="tv-player-header">
                    <span className="tv-player-dot" />
                    <span className="tv-player-title">{activeVideo.model} · {activeVideo.config}</span>
                    <a href={`https://youtube.com/shorts/${activeVideo.id}`} target="_blank" rel="noreferrer"
                      className="tv-yt-link" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                      ↗ YouTube
                    </a>
                  </div>
                  <div className="tv-embed-shorts">
                    <iframe
                      key={activeVideo.id}
                      src={`https://www.youtube.com/embed/${activeVideo.id}?rel=0&modestbranding=1`}
                      title={`${activeVideo.model} ${activeVideo.config}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ EXPERIENCE ═══════════════════════════════════════════ */}
        <section id="experience" className={`section reveal ${isVis('experience') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">05.</span>
            <h2 className="section-title">Experience</h2>
            <div className="section-line" />
          </div>
          <div className="exp-layout">
            <div className="exp-tabs" ref={expTabsRef}>
              {EXPERIENCES.map((e, i) => (
                <button key={i}
                  ref={el => expTabRefs.current[i] = el}
                  className={`exp-tab ${activeExpIndex === i ? 'active' : ''}`}
                  onClick={() => handleExpTabClick(i)}
                  onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                  style={{ cursor: cur }}>
                  <span className="exp-tab-num">0{i + 1}</span>
                  <span className="exp-tab-role">{e.role}</span>
                  <span className="exp-tab-co">{e.company}</span>
                </button>
              ))}
            </div>
            <div className="exp-detail">
              {EXPERIENCES.map((e, i) => i === activeExpIndex && (
                <div key={i} className="exp-panel active">
                  <div className="exp-panel-top">
                    <div>
                      <h3 className="exp-role">
                        {e.role}<span className="exp-company-inline"> @ {e.company}</span>
                      </h3>
                      <p className="exp-location">📍 {e.location}</p>
                    </div>
                    <div className="exp-right-meta">
                      <span className="exp-period">{e.period}</span>
                      <span className="exp-type-badge">{e.type}</span>
                    </div>
                  </div>
                  <ul className="exp-highlights">
                    {e.highlights.map((h, j) => (
                      <li key={j} style={{ animationDelay: `${j * 0.08}s` }}>
                        <span className="exp-bullet">▹</span><span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROJECTS ═════════════════════════════════════════════ */}
        <section id="projects" className={`section reveal ${isVis('projects') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">06.</span>
            <h2 className="section-title">Projects</h2>
            <div className="section-line" />
          </div>
          <p className="section-intro">
            Proyek-proyek yang merepresentasikan keahlian teknis dan cara saya berpikir.
            Beberapa proyek bersifat confidential karena merupakan milik klien.
          </p>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card" style={{ animationDelay: `${i * 0.08}s` }}
                onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
                <div className="project-card-top">
                  <span className="project-num">{p.num}</span>
                  <span className={`project-highlight hl-${p.highlight.toLowerCase().replace(' ', '-')}`}>{p.highlight}</span>
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-subtitle">{p.subtitle}</p>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t) => <span key={t} className="project-badge">{t}</span>)}
                </div>
                <div className="project-links">
                  {p.github ? (
                    <a href={p.github} target="_blank" rel="noreferrer"
                      className="proj-link-btn ghost" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  ) : (
                    <span className="proj-link-btn ghost confidential-badge">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      Private
                    </span>
                  )}
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noreferrer"
                      className="proj-link-btn accent" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                      {p.linkLabel || (p.github ? 'View →' : 'Live Site →')}
                    </a>
                  ) : p.linkLabel ? (
                    <span className="proj-link-btn accent" style={{ opacity: 0.5, cursor: 'default' }}>
                      {p.linkLabel}
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ CONTACT ══════════════════════════════════════════════ */}
        <section id="contact" className={`section reveal ${isVis('contact') ? 'visible' : ''}`}>
          <div className="section-header">
            <span className="section-num">07.</span>
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-line" />
          </div>
          <div className="contact-layout">
            <div className="contact-left">
              <h3 className="contact-heading">Mari Berkolaborasi!</h3>
              <p className="contact-text">
                Saya sedang aktif mencari peluang baru sebagai <strong>Full Stack Developer</strong>,
                <strong> UI/UX Designer</strong>, atau <strong>AI/Computer Vision Engineer</strong>.
                Apabila Anda memiliki posisi relevan, proyek menarik, atau ingin berdiskusi —
                jangan ragu menghubungi saya.
              </p>
              <div className="contact-info-cards">
                {[
                  { href: 'mailto:alexadma16@gmail.com', label: 'Email', value: 'alexadma16@gmail.com', icon: '✉' },
                  { href: 'https://www.linkedin.com/in/alexander-adma', label: 'LinkedIn', value: 'linkedin.com/in/alexander-adma', icon: 'in', target: '_blank' },
                  { href: 'https://wa.me/6282227175851', label: 'WhatsApp / Phone', value: 'Click Here to Chat', icon: '💬', target: '_blank' },
                ].map((c, i) => (
                  <a key={i} href={c.href} target={c.target} rel={c.target ? 'noreferrer' : undefined}
                    className="cic" onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                    <div className="cic-icon">{c.icon}</div>
                    <div className="cic-body">
                      <div className="cic-label">{c.label}</div>
                      <div className="cic-value">{c.value}</div>
                    </div>
                    <span className="cic-arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="contact-right">
              <div className="contact-form-box">
                <h4 className="cfb-title">Kirim Pesan Langsung</h4>
                <form onSubmit={handleContact} className="contact-form">
                  <div className="cf-row">
                    <div className="cf-group">
                      <label className="cf-label">Nama</label>
                      <input type="text" className="cf-input" placeholder="Nama Anda"
                        value={contactName} onChange={(e) => setContactName(e.target.value)}
                        required disabled={contactLoading} />
                    </div>
                    <div className="cf-group">
                      <label className="cf-label">Email</label>
                      <input type="email" className="cf-input" placeholder="email@perusahaan.com"
                        value={contactEmail} onChange={(e) => setContactEmail(e.target.value)}
                        required disabled={contactLoading} />
                    </div>
                  </div>
                  <div className="cf-group">
                    <label className="cf-label">Keperluan</label>
                    <select className="cf-input cf-select" value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      style={{ cursor: cur }} disabled={contactLoading}>
                      <option value="">Pilih keperluan...</option>
                      <option>Full Stack Developer</option>
                      <option>UI/UX Designer Position</option>
                      <option>AI / Computer Vision Project</option>
                      <option>Freelance Project</option>
                      <option>Diskusi / Kolaborasi</option>
                    </select>
                  </div>
                  <div className="cf-group">
                    <label className="cf-label">Pesan</label>
                    <textarea className="cf-input cf-textarea" placeholder="Halo Alex, saya tertarik untuk..."
                      rows={5} value={contactMsg} onChange={(e) => setContactMsg(e.target.value)}
                      required disabled={contactLoading} />
                  </div>
                  {contactError && (
                    <p className="cf-error">✕ {contactError}</p>
                  )}
                  <button type="submit" className="cf-submit"
                    onMouseEnter={hoverOn} onMouseLeave={hoverOff}
                    style={{ cursor: cur, opacity: contactLoading ? 0.7 : 1 }}
                    disabled={contactLoading}>
                    {contactLoading ? 'Mengirim...' : contactSent ? '✓ Pesan Terkirim!' : 'Kirim Pesan →'}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-top">
              <div className="footer-brand">
                {/* Footer logo juga Growup */}
                <span className="footer-logo">
                  <img
                    src="/Growup.jpg"
                    alt="Growup"
                    className="footer-logo-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'inline';
                    }}
                  />
                  <span style={{ display: 'none' }}>
                    <span className="logo-lt">&lt;</span>Growup<span className="logo-lt">/&gt;</span>
                  </span>
                </span>
                <p className="footer-tagline">Where dreams rise through the silence.</p>
              </div>
              <div className="footer-feedback">
                <p className="footer-fb-label">Drop a thought ↓</p>
                <form onSubmit={handleFeedback} className="footer-fb-form">
                  <textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Your feedback..." className="footer-fb-input" rows={2} disabled={feedbackLoading} />
                  <button type="submit" className="footer-fb-btn" disabled={feedbackLoading}
                    onMouseEnter={hoverOn} onMouseLeave={hoverOff} style={{ cursor: cur }}>
                    {feedbackLoading ? '...' : feedbackSent ? '✓ Sent!' : 'Send'}
                  </button>
                </form>
              </div>
              <div className="footer-links">
                <a href="mailto:alexadma16@gmail.com" className="footer-link">Email</a>
                <a href="https://www.linkedin.com/in/alexander-adma" target="_blank" rel="noreferrer" className="footer-link">LinkedIn</a>
                <a href="https://wa.me/6282227175851" target="_blank" rel="noreferrer" className="footer-link">WhatsApp</a>
                <a href="https://github.com/alexadma" target="_blank" rel="noreferrer" className="footer-link">GitHub</a>
              </div>
            </div>
            <div className="footer-bottom">
              <span>© 2025 Alexander Adma Karyadi · All Rights Reserved</span>
              <span>Built with React · Kota Sukabumi 🇮🇩</span>
            </div>
          </footer>
        </section>

      </main>
    </div>
  );
}