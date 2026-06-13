# SHMS — Secure Hospital Measure Security

Aplikasi web manajemen rumah sakit berbasis peran yang dibangun dengan **Java Spring Boot** dan frontend HTML/JS statis, dikembangkan sebagai proyek akhir mata kuliah **IFB-302 Keamanan Jaringan**. Sistem ini mengedepankan desain *security-first*, mengimplementasikan serangkaian proteksi yang direkomendasikan OWASP di samping alur kerja manajemen rumah sakit inti.

---

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Backend | Java 17, Spring Boot 3.4.5, Spring Security, Spring Data JPA |
| Frontend | Static HTML + Vite-bundled JS/CSS (disajikan oleh Spring Boot) |
| Database | MySQL 8 |
| Autentikasi | JWT (JJWT 0.12.5) |
| Rate Limiting | Bucket4j 8.14.0 |
| Inspeksi File | Apache Tika 3.2.1 |
| Dokumentasi API | SpringDoc OpenAPI (Swagger UI) |
| Build Tool | Maven |

---

## Fitur

### Manajemen Rumah Sakit

**Autentikasi & Manajemen Pengguna**
- Registrasi dan login pengguna dengan penetapan peran
- Kontrol akses berbasis peran di seluruh endpoint
- Manajemen profil melalui `/api/users/me`
- Akun admin default di-seed otomatis pada saat pertama kali dijalankan

**Manajemen Pasien**
- Membuat dan mengelola profil pasien
- Menyimpan data pasien: NIK, tanggal lahir, jenis kelamin, golongan darah, dan kontak darurat
- Akses dibatasi berdasarkan peran (pasien hanya dapat melihat data sendiri; dokter dan perawat dapat mengakses rekam medis pasien)

**Manajemen Dokter**
- Mendaftarkan dan mengelola profil dokter
- Daftar dokter dapat diakses oleh admin dan peran yang berwenang

**Manajemen Janji Temu**
- Membuat dan memantau janji temu medis
- Dapat diakses oleh pasien (pesan), perawat, dan admin (kelola)

**Rekam Medis**
- Membuat dan melihat rekam medis pasien
- Dibatasi hanya untuk dokter dan admin

**Hasil Laboratorium**
- Mengunggah dan mengelola data hasil laboratorium
- Terhubung dengan data pasien dan rekam medis

**Resep**
- Manajemen resep dan item resep
- Terkait dengan rekam medis dan ditangani oleh personel yang berwenang

**Unggah File Aman**
- Mengunggah dokumen medis dan file hasil laboratorium
- Dibatasi hanya untuk dokter, perawat, dan admin

**Notifikasi**
- Entitas notifikasi dalam sistem untuk peringatan kepada pengguna

---

### Fitur Keamanan

#### 1. Hashing Password — BCrypt (cost = 12)
Semua password pengguna di-hash menggunakan BCrypt dengan work factor 12, membuat serangan brute-force menjadi sangat mahal secara komputasi. Password dalam bentuk teks biasa tidak pernah disimpan.

#### 2. Autentikasi Stateless Berbasis JWT
Sesi dikelola sepenuhnya melalui JSON Web Token (JWT) yang ditandatangani dengan HMAC-SHA256. Token memiliki masa berlaku 24 jam (`86400000 ms`). Tidak ada sesi di sisi server, yang secara inheren mengeliminasi vektor serangan CSRF tradisional.

#### 3. Validasi Input & Sanitasi XSS
- Semua field request divalidasi menggunakan **Bean Validation** (`@NotBlank`, `@Email`, `@Size`, dll.)
- String yang diberikan pengguna disanitasi di `AuthService` — karakter `<`, `>`, `"`, `'` di-encode menjadi HTML sebelum disimpan, mencegah HTML injection dan XSS.
- Header **Content Security Policy (CSP)** membatasi sumber skrip dan resource hanya ke `'self'`.

#### 4. Proteksi SQL Injection
Semua interaksi database dilakukan melalui **parameterized query JPA/Hibernate**. Tidak ada string SQL native mentah dalam kodebase, mengeliminasi risiko SQL injection.

#### 5. Role-Based Access Control (RBAC)
Spring Security memberlakukan otorisasi di level endpoint:

| Peran | Endpoint yang Dapat Diakses |
|-------|-----------------------------|
| `ADMIN` | `/api/admin/**`, `/api/monitor/**`, semua endpoint manajemen |
| `DOKTER` | `/api/medical-record/**`, `/api/upload/**`, data pasien |
| `PASIEN` | `/api/patient/**`, `/api/appointment/**` |
| `APOTEKER` | Fungsionalitas terkait apotek |
| `PERAWAT` | Data pasien, janji temu, unggah file |

#### 6. Rate Limiting — Bucket4j (Token Bucket)
Filter rate limiting per-IP (`RateLimitFilter`) melindungi semua endpoint API:
- **Endpoint auth** (`/api/auth/**`): **5 request/menit** — mencegah serangan brute-force login
- **Endpoint API umum**: **60 request/menit** — membatasi penyalahgunaan API
- Mengembalikan HTTP `429 Too Many Requests` dengan pesan error JSON saat batas terlampaui
- Resource statis (HTML, CSS, JS, gambar) dikecualikan dari rate limiting

#### 7. Proteksi Brute-Force Login
`LoginAttemptService` melacak percobaan login yang gagal per email:
- Setelah **5 kali gagal berturut-turut**, akun diblokir sementara selama **15 menit**
- Saat login berhasil, penghitung kegagalan direset
- Akun yang terblokir memicu entri audit log `LOGIN_BLOCKED`

#### 8. Enkripsi AES-128-CBC untuk Data Sensitif
Field sensitif (nomor HP, alamat, dll.) dienkripsi saat disimpan menggunakan AES-128-CBC melalui `EncryptionUtil`:
- Kunci enkripsi diambil dari environment variable (`ENCRYPTION_KEY`)
- **IV acak dibuat untuk setiap operasi enkripsi**, mencegah serangan analisis pola
- Format output: `Base64(IV):Base64(ciphertext)`

#### 9. Unggah File Aman
`UploadService` menerapkan beberapa lapisan validasi file:
- **Validasi MIME type** menggunakan Apache Tika (memeriksa byte file secara langsung, bukan sekadar ekstensi) — hanya `application/pdf`, `image/png`, dan `image/jpeg` yang diterima
- **Sanitasi nama file** — karakter khusus diganti dengan `_` sebelum disimpan
- **Penamaan ulang berbasis UUID** — file yang diunggah disimpan dengan nama yang dibuat secara acak, mencegah serangan berbasis nama file
- **Hashing SHA-256** — hash dihitung untuk setiap file; file duplikat otomatis ditolak
- **Batas ukuran file 2 MB** diberlakukan di level servlet

#### 10. Security Headers
Header keamanan HTTP berikut diterapkan secara global:

| Header | Nilai |
|--------|-------|
| `X-XSS-Protection` | `1; mode=block` |
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline'; ...` |
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |

#### 11. Audit Logging
Setiap aksi penting dicatat ke tabel `audit_logs` melalui `AuditLogService` dan `AuditInterceptor`:
- Event yang dicatat meliputi: `REGISTER`, `LOGIN_SUCCESS`, `LOGIN_FAILED`, `LOGIN_BLOCKED`, `LOGIN_ERROR`, `UPLOAD_FILE`
- Setiap entri log mencatat: jenis aksi, endpoint, pengguna yang melakukan, alamat IP, tingkat keparahan (`LOW` / `MEDIUM` / `HIGH`), dan timestamp

#### 12. Dashboard Monitoring Keamanan
`MonitoringService` menyediakan dashboard keamanan real-time (khusus admin di `/api/monitor/**`):
- Jumlah entri audit log dengan severity **HIGH**
- Jumlah **akun yang sedang diblokir**
- Jumlah **file yang belum di-scan**
- 10 entri audit log terbaru

#### 13. Penjadwal Monitor Keamanan
`SecurityMonitorScheduler` berjalan setiap **5 menit** dan mencatat peringatan jika ada akun yang masih terblokir — memungkinkan deteksi dini terhadap upaya serangan yang sedang berlangsung.

#### 14. Penanganan Error yang Aman
`GlobalExceptionHandler` menangkap semua exception yang tidak tertangani dan mengembalikan respons error generik. Stack trace dan pesan error internal **tidak pernah dikirim ke client**, mencegah kebocoran informasi. Hal ini juga diberlakukan di `application.properties`:
```properties
server.error.include-stacktrace=never
server.error.include-message=never
```

#### 15. Proteksi CSRF (by Design)
Karena aplikasi ini sepenuhnya stateless (JWT, tanpa session cookie), aplikasi tidak rentan terhadap Cross-Site Request Forgery. Proteksi CSRF secara eksplisit dinonaktifkan dalam konfigurasi Spring Security sebagai pilihan desain yang disengaja dan tepat.

---

## Peran Pengguna

| Label Frontend | Peran Backend | Deskripsi |
|---------------|--------------|-----------|
| Admin | `ADMIN` | Akses penuh ke sistem, monitoring, manajemen pengguna |
| Dokter | `DOKTER` | Rekam medis, hasil lab, unggah file |
| Pasien | `PASIEN` | Lihat data sendiri, pesan janji temu |
| Apoteker | `APOTEKER` | Manajemen apotek dan resep |

---

## Cara Menjalankan

### Prasyarat
- Java 17+
- MySQL 8
- Maven

### Konfigurasi

Set environment variable berikut sebelum menjalankan (atau edit `application.properties` untuk development):

```bash
export JWT_SECRET="string_acak_minimal_64_karakter_di_sini"
export ENCRYPTION_KEY="tepat16karakter!"
export DB_USER="shms_user"
export DB_PASS="password_database_kamu"
export SERVER_PORT=8080
```

### Menjalankan Aplikasi

```bash
# Clone repository
git clone <repository-url>
cd SHMS

# Build
./mvnw clean package

# Jalankan
java -jar target/secure-hospital-system-1.0.jar
```

Database (`shms_db`) akan dibuat otomatis saat pertama kali dijalankan. Tabel dikelola oleh Hibernate (`ddl-auto=update`).

### Akun Admin Default

Akun admin di-seed secara otomatis saat pertama kali dijalankan:

| Field | Nilai |
|-------|-------|
| Email | `admin@shms.local` |
| Password | `Admin@123!` |

> **Segera ganti password default ini setelah login pertama!**

---

## Dokumentasi API

Swagger UI tersedia di:
```
http://localhost:8080/swagger-ui/index.html
```

OpenAPI JSON spec:
```
http://localhost:8080/v3/api-docs
```

---

## Struktur Proyek

```
src/main/java/com/shms/
├── config/           # Konfigurasi Security, CORS, JWT filter, audit interceptor, exception handler
├── controller/       # REST controller (auth, pasien, dokter, janji temu, dll.)
├── dto/              # Request dan response DTO
│   ├── request/
│   └── response/
├── entity/           # JPA entity (User, Patient, Doctor, AuditLog, dll.)
├── filter/           # RateLimitFilter (Bucket4j)
├── repository/       # Spring Data JPA repository
├── scheduler/        # SecurityMonitorScheduler
├── security/         # JwtService, CustomUserDetailsService
├── service/          # Logika bisnis (Auth, Upload, Monitoring, dll.)
└── util/             # EncryptionUtil (AES-128-CBC)
```

---

## Ringkasan Implementasi Keamanan

| # | Kebutuhan Keamanan | Status | Implementasi |
|---|-------------------|--------|-------------|
| 1 | Hashing password | ✅ | BCrypt cost=12 |
| 2 | Manajemen sesi | ✅ | Stateless JWT, expiry 24 jam |
| 3 | Validasi input | ✅ | Bean Validation + sanitasi XSS |
| 4 | Proteksi SQL Injection | ✅ | JPA parameterized queries |
| 5 | Proteksi XSS | ✅ | CSP header + HTML encoding |
| 6 | Proteksi CSRF | ✅ | Stateless JWT (tanpa session cookie) |
| 7 | Rate limiting / brute-force | ✅ | Bucket4j: 5 req/menit auth, 60 req/menit API |
| 8 | Role-based access control | ✅ | Spring Security RBAC |
| 9 | Unggah file aman | ✅ | Apache Tika MIME check, SHA-256, UUID rename |
| 10 | Logging & monitoring | ✅ | AuditLog di setiap aksi + dashboard keamanan |
| 11 | Keamanan JWT | ✅ | HMAC-SHA256, pengecekan expiry, penanganan token invalid |
| 12 | Enkripsi data sensitif | ✅ | AES-128-CBC dengan IV acak |
| 13 | Security headers | ✅ | XSS, CSP, X-Frame-Options, XCTO, Referrer-Policy |
| 14 | Penanganan error yang aman | ✅ | GlobalExceptionHandler — stack trace tidak pernah dikirim ke client |

---

## Lisensi

Proyek ini dikembangkan untuk keperluan akademik di **Institut Teknologi Nasional Bandung (ITENAS)** — Mata Kuliah IFB-302 Keamanan Jaringan.
