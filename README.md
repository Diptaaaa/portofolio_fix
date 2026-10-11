<div align="center">

# Muhammad Rafli Pradipta — Fullstack Web Portfolio & CMS Platform

**A Modern, Apple-Inspired Fullstack Portfolio & Dedicated Content Management System**  
*Built with Laravel 12, Inertia.js, React 19, and Tailwind CSS v4*

[![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net)
[![Tests Passing](https://img.shields.io/badge/Tests-15%20Passed%20(70%20Assertions)-success?style=for-the-badge&logo=github-actions)](https://github.com)

</div>

---

## 📌 Tentang Proyek

Repositori ini adalah platform portofolio digital personal dan sistem manajemen konten (CMS) yang dirancang dan dikembangkan secara khusus untuk **mendukung dan mengakselerasi perjalanan karier profesional Muhammad Rafli Pradipta** (alumnus Apple Developer Academy dan praktisi Data Analyst / Software Engineer).

Tujuan utama dari proyek ini adalah:
1. **Representasi Portofolio Berstandar Industri**: Memamerkan karya-karya rekayasa perangkat lunak (*Fullstack Web, iOS/Apple ecosystem, Data Analytics dashboards*) melalui antarmuka interaktif kelas dunia dengan estetika tinggi (*Apple-inspired luxury aesthetic*).
2. **Kemandirian Pengelolaan Konten (Full-Control Admin CMS)**: Menyediakan panel kendali mandiri yang aman dan responsif untuk memperbarui proyek, keahlian teknis, rekam jejak pelatihan, penghargaan, status ketersediaan kerja (*live availability badge*), serta manajemen unduhan berkas CV (Curriculum Vitae).
3. **Pembuktian Standar Rekayasa Web Modern**: Menerapkan arsitektur monolit modern (*Inertia.js single-page application*) yang cepat, teruji secara ketat melalui automated testing, serta bebas dari bloatware.

---

## ✨ Fitur-Fitur Utama

### 🎨 1. Frontend Publik (User Experience)
- **Hero Section dengan Cutout Subjek & Teks Outline Parallax**: Foto profil subjek dengan efek cutout berlapis di atas tipografi nama berskala besar yang merespons pergerakan scroll.
- **3D Cover Flow Carousel Proyek Unggulan**: Komponen carousel proyek interaktif bergaya Apple dengan efek rotasi 3D dan kedalaman visual realistis.
- **What I Can Do (Capabilities Bento Grid & Tech Matrix)**: Tata letak bento grid responsif dengan matriks 16 badge tech stack berwarna dan dua kartu kapabilitas digital (IT/Web/QA dan VA/Data Operations).
- **Interactive Trait Deck (About Me)**: Kartu karakteristik profesional 3D interaktif yang dapat dibolak-balik (*perspective flip*) untuk menampilkan profil, statistik proyek, dan prinsip kerja.
- **Recognition & Journey Timeline**: Kolase pencapaian, sertifikasi internasional, dan tonggak perjalanan karier dengan preview foto lightbox.
- **Trainings & Experience Chronicle**: Kronologi pengalaman profesional, magang industri, dan hackathon.
- **Dual-Theme System (Dark Luxury & Light Cream)**: Transisi silky crossfade antara mode *Dark Luxury Espresso* (`#1A1412`) dan *Warm Cream* (`#F7F4F0`) yang adaptif terhadap preferensi pengguna.
- **Modal Interaktif & Kontak Cepat**: Formulir kontak terintegrasi dengan validasi real-time dan notifikasi toast.

### 🛡️ 2. Admin Content Management System (CMS)
- **Autentikasi Aman**: Sistem proteksi route admin dengan middleware autentikasi sesi Laravel.
- **Dashboard & Live Profile Control**:
  - Pengaturan nama lengkap, tagline, bio, dan link media sosial.
  - Sakelar instan status ketersediaan kerja (*Available for Work pulsing badge*).
  - Simulator langsung foto cutout hero profil.
  - Pengelola unggah dan unduh berkas CV (PDF).
- **Projects Manager**: Manajemen lengkap (CRUD) proyek teknis dan digital, pemilihan status *featured* untuk carousel 3D, serta upload thumbnail.
- **Skills & Tech Stack Manager**: Kelola daftar teknologi dan persentase kemahiran per kategori.
- **Trainings & Experience Manager**: Kelola riwayat pengalaman kerja dan pelatihan.
- **Awards & Milestones Manager**: Kelola daftar sertifikat dan foto dokumentasi penghargaan.
- **Traits Manager**: Kelola kartu interaktif pada bagian About Me.
- **Inquiries & Messages Inbox**: Kotak masuk pesan dari formulir kontak publik dengan penanda status baca.
- **Mobile-First Responsive Layout**: Dilengkapi *Off-canvas Slide-over Drawer* dan *Sticky Topbar (56px)* yang rapi dan nyaman digunakan melalui smartphone.

---

## 🛠️ Tech Stack & Arsitektur

| Lapisan | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Backend Framework** | [Laravel 12](https://laravel.com) | Routing modern, Eloquent ORM, Storage Management, Security & CSRF protection |
| **Frontend Adapter** | [Inertia.js v2](https://inertiajs.com) | Menjembatani Laravel dan React tanpa perlu membangun REST API terpisah |
| **View Layer** | [React 19](https://react.dev) | Komponen UI reaktif, declarative state management |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) + CSS Variables | Desain adaptif, luxury palette tokens, dan micro-interactions |
| **Icons & Animasi** | [Lucide React](https://lucide.dev) | Icon set modern dan ringan |
| **Database** | MySQL / MariaDB (atau SQLite) | Penyimpanan relasional data portofolio |
| **Build Tool** | [Vite 6](https://vitejs.dev) | Kompilasi Hot Module Replacement (HMR) berkecepatan tinggi |

---

## 🚀 Panduan Menjalankan Proyek (Local Development)

### 1. Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- PHP >= 8.2 (dengan ekstensi `pdo`, `mbstring`, `openssl`, `fileinfo`)
- Composer >= 2.x
- Node.js >= 18.x dan NPM
- Database MySQL atau SQLite

### 2. Kloning Repositori
```bash
git clone https://github.com/username/portfolio-rafli.git
cd portfolio-rafli
```

### 3. Instal Dependensi
```bash
# Instal dependensi backend (PHP)
composer install

# Instal dependensi frontend (JavaScript)
npm install
```

### 4. Konfigurasi Lingkungan (.env)
Salin berkas konfigurasi lingkungan:
```bash
cp .env.example .env
```
Buka berkas `.env` dan sesuaikan konfigurasi database Anda (misalnya MySQL di Laragon / XAMPP):
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=porto_baru
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Generate Application Key & Jalankan Migrasi
```bash
# Generate encryption key
php artisan key:generate

# Jalankan migrasi tabel dan seeder data awal
php artisan migrate --seed

# Hubungkan symlink storage publik
php artisan storage:link
```

> **Catatan Seeder**: Perintah `--seed` akan secara otomatis membuat akun Administrator default dan mengisi seluruh data portofolio awal (proyek unggulan, keahlian, pelatihan, dan penghargaan).

### 6. Kompilasi Aset Frontend
```bash
# Untuk mode pengembangan (HMR aktif)
npm run dev

# ATAU untuk build produksi
npm run build
```

### 7. Jalankan Server Web
```bash
php artisan serve
```
Buka browser Anda di `http://127.0.0.1:8000/`.

---

## 🔐 Kredensial Administrator Default (Testing)

Untuk mengakses panel CMS Admin, kunjungi `http://127.0.0.1:8000/admin/login`:
- **Email**: `admin@rafli.dev`
- **Password**: `password`

*(Pastikan untuk mengganti kredensial ini di lingkungan produksi melalui menu profil CMS).*

---

## 🧪 Pengujian Otomatis (Automated Tests)

Aplikasi ini dilengkapi pengujian unit dan fitur komprehensif untuk memastikan seluruh alur kritis berjalan dengan baik:
```bash
php artisan test
```

**Hasil Pengujian:**
- Total Suites: **15 passed** (Unit & Feature)
- Total Assertions: **70 passed**
- Cakupan: Autentikasi Admin, Akses Publik, CRUD Proyek, Manajemen Status Availability, Upload CV & Foto Cutout, Manajemen Trait, dan Pengiriman Formulir Kontak.

---

## 📁 Struktur Direktori Utama

```
porto-baru/
├── app/
│   ├── Http/Controllers/       # Controller Publik dan Admin CMS
│   └── Models/                 # Eloquent Model (Project, Skill, TraitCard, Award, Experience, dll)
├── database/
│   ├── migrations/             # Skema migrasi basis data
│   └── seeders/                # Seeder data portofolio awal
├── resources/
│   ├── css/
│   │   └── app.css             # Desain token tema, varian warna dark & light, micro-animations
│   └── js/
│       ├── Components/         # Komponen reusable (Hero, Carousel, Bento, Deck, AdminLayout, Navbar)
│       └── Pages/              # Halaman Inertia (Public/Index, Public/Archive, Admin/*)
├── routes/
│   └── web.php                 # Rute publik & rute admin terlindungi
└── public/
    └── images/                 # Aset grafis statis dan cutout profil
```

---

## 👤 Profil & Kontak

**Muhammad Rafli Pradipta**  
*Fullstack Engineer & Junior Data Analyst*  
- **LinkedIn**: [linkedin.com/in/muhammad-rafli-pradipta](https://linkedin.com)
- **GitHub**: [github.com/](https://github.com)
- **Email**: `pradiptarafli234@gmail.com`

---

## 📄 Lisensi

Proyek ini dibuat dan dikembangkan sebagai portofolio pribadi. Seluruh kode sumber dilisensikan di bawah [MIT License](LICENSE).
