# 📦 Sistem Manajemen Barang

<div align="center">

![Laravel](https://img.shields.io/badge/Laravel-12.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Inertia.js](https://img.shields.io/badge/Inertia.js-2.x-9553E9?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

**Aplikasi manajemen barang modern dengan autentikasi lengkap**

[Fitur](#-fitur) • [Instalasi](#-instalasi) • [Penggunaan](#-penggunaan) • [Dokumentasi](#-dokumentasi)

</div>

---

## 📋 Daftar Isi

- [Tentang Aplikasi](#-tentang-aplikasi)
- [Fitur](#-fitur)
- [Teknologi yang Digunakan](#-teknologi-yang-digunakan)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Konfigurasi](#-konfigurasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [API & Routes](#-api--routes)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 🎯 Tentang Aplikasi

Aplikasi manajemen barang ini dibangun pakai **Laravel 12** dan **React 19**, dengan **Inertia.js** sebagai jembatan antara backend sama frontend. Tujuannya sih buat bantu ngelola inventori barang jadi lebih gampang dan terorganisir.

### ✨ Yang Menarik

- 🚀 Pakai stack teknologi terbaru dari Laravel dan React
- 🎨 UI yang oke dengan dukungan dark mode
- 🔒 Ada sistem autentikasi dengan rate limiting buat keamanan
- 📱 Responsive, bisa dipake dari HP atau laptop
- ⚡ Cepet karena pakai Inertia.js

---

## 🎨 Fitur

### 🔐 Autentikasi & Keamanan

- ✅ Login/Logout dengan validasi form
- ✅ Rate limiting buat cegah brute force attack
- ✅ Session management yang aman
- ✅ CSRF protection otomatis
- ✅ Password hashing pakai bcrypt

### 📦 Manajemen Barang

- ✅ Daftar barang dengan tabel yang informatif
- ✅ Tambah barang dengan form validasi lengkap
- ✅ Edit barang buat update informasi
- ✅ Hapus barang dengan konfirmasi
- ✅ Pencarian & filter (bisa dikembangin lebih lanjut)

### 📊 Informasi Barang

Setiap barang punya info lengkap:
- 📝 Nama barang
- 📄 Deskripsi
- 📊 Stok tersedia
- 💰 Harga (format Rupiah)
- 🏷️ Kategori

### 🎨 User Interface

- 🌓 Dark mode support - tema gelap dan terang
- 📱 Responsive design - bisa dipake dari HP atau laptop
- 🎯 Navigasi yang gampang dipahami
- ⚡ Loading cepat karena optimized

---

## 🛠️ Teknologi yang Digunakan

### Backend

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **PHP** | 8.3+ | Bahasa pemrograman utama |
| **Laravel** | 12.x | Framework PHP modern |
| **Inertia.js Laravel** | 2.x | Bridge untuk SPA experience |
| **Laravel Wayfinder** | 0.x | Type-safe route generation |

### Frontend

| Teknologi | Versi | Deskripsi |
|-----------|-------|-----------|
| **React** | 19.x | Library UI modern |
| **TypeScript** | 5.x | Type-safe JavaScript |
| **Inertia.js React** | 2.x | React adapter untuk Inertia |
| **Tailwind CSS** | 4.x | Utility-first CSS framework |
| **Vite** | 7.x | Build tool yang cepat |

### Development Tools

- **Pest PHP** - Testing framework
- **Laravel Pint** - Code formatter
- **ESLint** - JavaScript linter
- **Prettier** - Code formatter

---

## 📋 Yang Diperlukan

Sebelum mulai, pastikan udah install ini semua:

### Minimum

- **PHP** >= 8.2
- **Composer** >= 2.0
- **Node.js** >= 18.x
- **npm** >= 9.x atau **yarn** >= 1.22
- **PostgreSQL** 13+ (database yang dipake)

### Recommended

- **PHP** 8.3 atau lebih tinggi
- **Node.js** 20.x LTS
- **PostgreSQL** 14+ untuk production
- **Redis** (opsional, buat caching)

---

## 🚀 Cara Install

Ikutin langkah-langkah ini:

### 1️⃣ Clone Repository

```bash
git clone <https://github.com/BintangXD112/manajemen-barang>
cd manajemen-barang
```

### 2️⃣ Install Dependencies

Install dulu backend dependencies:

```bash
composer install
```

Terus install frontend dependencies:

```bash
npm install
```

### 3️⃣ Setup Environment

Copy file `.env.example` jadi `.env`:

```bash
cp .env.example .env
php artisan key:generate
```

Edit file `.env` dan sesuaikan konfigurasi database PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=manajemen_barang
DB_USERNAME=postgres
DB_PASSWORD=password_kamu
```

> **Catatan**: Ganti `DB_DATABASE`, `DB_USERNAME`, dan `DB_PASSWORD` sesuai dengan konfigurasi PostgreSQL kamu.

### 4️⃣ Setup Database PostgreSQL

Buat database dulu di PostgreSQL:

```sql
CREATE DATABASE manajemen_barang;
```

Atau lewat command line:

```bash
createdb manajemen_barang
```

Pastikan PostgreSQL service udah jalan, terus cek koneksi dengan:

```bash
php artisan migrate:status
```

### 5️⃣ Jalankan Migrasi & Seeder

Jalankan migrasi buat bikin tabel-tabel yang diperlukan:

```bash
php artisan migrate
php artisan db:seed
```

Ini bakal bikin:
- ✅ Tabel `users`
- ✅ Tabel `barangs`
- ✅ User default buat login (email: `admin@example.com`, password: `password`)

### 6️⃣ Build Frontend

Kalo mau development, jalanin:

```bash
npm run dev
```

Kalo mau production, build dulu:

```bash
npm run build
```

### 7️⃣ Jalankan Server

```bash
php artisan serve
```

Aplikasi bakal jalan di `http://localhost:8000`

---

## ⚙️ Konfigurasi

### 🔑 Login Default

Setelah jalanin seeder, bisa login pakai:

```
Email: admin@example.com
Password: password
```

> ⚠️ **PENTING**: Jangan lupa ganti password default kalo mau dipake di production!

### 📝 Konfigurasi Lainnya

#### Session

File: `config/session.php`

```php
'driver' => env('SESSION_DRIVER', 'file'),
'lifetime' => env('SESSION_LIFETIME', 120),
```

#### Rate Limiting

File: `app/Http/Requests/Auth/LoginRequest.php`

Default: maksimal 5 kali percobaan login per email per IP. Kalo lebih dari itu, bakal di-lockout sementara.

#### PostgreSQL Connection

Pastikan extension yang diperlukan udah terinstall di PostgreSQL. Biasanya Laravel butuh:

- `pdo_pgsql` extension di PHP
- PostgreSQL client library

Cek dengan:

```bash
php -m | grep pgsql
```

---

## 📖 Cara Pakai

### 🔐 Login

1. Buka aplikasi di browser: `http://localhost:8000`
2. Bakal langsung diarahkan ke halaman login
3. Masukin kredensial:
   - **Email**: `admin@example.com`
   - **Password**: `password`
4. Klik tombol **Masuk**

### 📦 Ngelola Barang

#### Nambah Barang Baru

1. Klik tombol **"Tambah Barang"** di halaman utama
2. Isi form-nya:
   - **Nama Barang** (wajib)
   - **Deskripsi** (opsional)
   - **Stok** (wajib, minimal 0)
   - **Harga** (wajib, minimal 0)
   - **Kategori** (opsional)
3. Klik **"Simpan"**

#### Edit Barang

1. Di halaman daftar barang, klik **"Edit"** di barang yang mau diubah
2. Ubah informasi yang perlu
3. Klik **"Simpan Perubahan"**

#### Hapus Barang

1. Di halaman daftar barang, klik **"Hapus"** di barang yang mau dihapus
2. Konfirmasi penghapusan
3. Barang bakal dihapus permanen

### 🚪 Logout

Klik tombol **"Logout"** di pojok kanan atas buat keluar dari aplikasi.

---

## 📁 Struktur Proyek

```
manajemen-siswa/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Auth/
│   │   │   │   ├── LoginController.php
│   │   │   │   └── LogoutController.php
│   │   │   └── BarangController.php
│   │   ├── Middleware/
│   │   │   └── RedirectIfAuthenticated.php
│   │   └── Requests/
│   │       ├── Auth/
│   │       │   └── LoginRequest.php
│   │       └── Barang/
│   │           ├── StoreBarangRequest.php
│   │           └── UpdateBarangRequest.php
│   └── Models/
│       ├── User.php
│       └── Barang.php
├── bootstrap/
│   └── app.php
├── database/
│   ├── factories/
│   │   ├── UserFactory.php
│   │   └── BarangFactory.php
│   ├── migrations/
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   └── 2024_01_01_000003_create_barangs_table.php
│   └── seeders/
│       ├── DatabaseSeeder.php
│       └── UserSeeder.php
├── resources/
│   ├── js/
│   │   ├── pages/
│   │   │   ├── Auth/
│   │   │   │   └── Login.tsx
│   │   │   └── Barang/
│   │   │       ├── Index.tsx
│   │   │       ├── Create.tsx
│   │   │       └── Edit.tsx
│   │   └── app.tsx
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
└── tests/
    ├── Feature/
    └── Unit/
```

---

## 🔌 API & Routes

### Authentication Routes

| Method | URI | Name | Controller | Middleware |
|--------|-----|------|------------|------------|
| GET | `/login` | `login` | `LoginController@create` | `guest` |
| POST | `/login` | `login.store` | `LoginController@store` | `guest` |
| POST | `/logout` | `logout` | `LogoutController@destroy` | `auth` |

### Barang Routes (Resource)

| Method | URI | Name | Controller | Middleware |
|--------|-----|------|------------|------------|
| GET | `/barang` | `barang.index` | `BarangController@index` | `auth` |
| GET | `/barang/create` | `barang.create` | `BarangController@create` | `auth` |
| POST | `/barang` | `barang.store` | `BarangController@store` | `auth` |
| GET | `/barang/{id}/edit` | `barang.edit` | `BarangController@edit` | `auth` |
| PUT/PATCH | `/barang/{id}` | `barang.update` | `BarangController@update` | `auth` |
| DELETE | `/barang/{id}` | `barang.destroy` | `BarangController@destroy` | `auth` |

### Database Schema

#### Users Table

```sql
- id (bigint, primary key)
- name (string)
- email (string, unique)
- email_verified_at (timestamp, nullable)
- password (string, hashed)
- remember_token (string, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Barangs Table

```sql
- id (bigint, primary key)
- nama (string)
- deskripsi (text, nullable)
- stok (integer)
- harga (decimal 10,2)
- kategori (string, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## 🧪 Testing

Aplikasi pakai **Pest PHP** buat testing.

### Jalanin Tests

```bash
# Semua tests
php artisan test

# Tests spesifik
php artisan test --filter=LoginTest

# Dengan coverage
php artisan test --coverage
```

### Nulis Tests

Contoh test buat authentication:

```php
it('can login with valid credentials', function () {
    $user = User::factory()->create([
        'email' => 'test@example.com',
        'password' => Hash::make('password'),
    ]);

    $response = $this->post('/login', [
        'email' => 'test@example.com',
        'password' => 'password',
    ]);

    $response->assertRedirect('/barang');
    $this->assertAuthenticatedAs($user);
});
```

---

## 🐛 Masalah yang Sering Muncul

### Error: "Class not found"

Biasanya karena autoload belum di-update. Coba:

```bash
composer dump-autoload
php artisan optimize:clear
```

### Error: "Vite manifest not found"

Frontend belum di-build. Jalanin:

```bash
npm run build
# atau kalo development:
npm run dev
```

### Error: "Database connection failed" (PostgreSQL)

Cek beberapa hal ini:

1. Pastikan PostgreSQL service udah jalan:
   ```bash
   # Windows (Laragon)
   # Cek di Laragon panel
   
   # Linux
   sudo systemctl status postgresql
   ```

2. Pastikan database udah dibuat:
   ```sql
   CREATE DATABASE manajemen_barang;
   ```

3. Cek konfigurasi di `.env`:
   ```env
   DB_CONNECTION=pgsql
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DATABASE=manajemen_barang
   DB_USERNAME=postgres
   DB_PASSWORD=password_kamu
   ```

4. Test koneksi:
   ```bash
   php artisan migrate:status
   ```

### Error: "Route [login] not defined"

Clear route cache:

```bash
php artisan route:clear
php artisan route:cache
```

### Error: "419 Page Expired" (CSRF)

Biasanya masalah session. Coba:

- Clear browser cache dan cookies
- Cek konfigurasi `SESSION_DRIVER` di `.env` (harus `file` atau `database`)
- Pastikan folder `storage/framework/sessions` bisa di-write

### Error: "PDO Exception" saat migrate

Pastikan extension PostgreSQL udah terinstall di PHP:

```bash
php -m | grep pgsql
```

Kalo belum ada, install extension `pdo_pgsql` di PHP.

### Command yang Berguna

```bash
# Clear semua cache
php artisan optimize:clear

# Regenerate autoload
composer dump-autoload

# Refresh database (hati-hati, ini hapus semua data!)
php artisan migrate:fresh --seed

# Generate wayfinder routes
php artisan wayfinder:generate

# Cek koneksi database
php artisan migrate:status
```

---

## 🤝 Mau Kontribusi?

Silakan! Caranya:

1. **Fork** repository ini
2. Buat **branch** baru buat fitur kamu (`git checkout -b feature/fitur-keren`)
3. **Commit** perubahan kamu (`git commit -m 'Tambah fitur keren'`)
4. **Push** ke branch kamu (`git push origin feature/fitur-keren`)
5. Buka **Pull Request**

### Code Style

- Pakai **Laravel Pint** buat format PHP
- Pakai **Prettier** buat format JavaScript/TypeScript
- Ikutin **PSR-12** coding standards
- Tulis **tests** buat fitur baru

```bash
# Format PHP
vendor/bin/pint

# Format JS/TS
npm run format
```

---

## 📝 Changelog

### Version 1.0.0

#### Yang Udah Ada
- ✅ Sistem autentikasi lengkap (login/logout)
- ✅ CRUD manajemen barang
- ✅ UI modern dengan dark mode
- ✅ Form validation
- ✅ Rate limiting buat login
- ✅ Responsive design
- ✅ Support PostgreSQL

#### Keamanan
- 🔒 CSRF protection
- 🔒 Password hashing
- 🔒 Session management
- 🔒 Rate limiting

---

## 📄 Lisensi

Aplikasi ini menggunakan lisensi **MIT License**.

---

## 👨‍💻 Author

Dibuat pakai Laravel dan React

---

## 🙏 Credits

- [Laravel](https://laravel.com) - Framework PHP yang mantap
- [React](https://react.dev) - Library UI modern
- [Inertia.js](https://inertiajs.com) - Modern monolith approach
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework

---

<div align="center">

**⭐ Kalo project ini membantu, kasih star ya! ⭐**

</div>

