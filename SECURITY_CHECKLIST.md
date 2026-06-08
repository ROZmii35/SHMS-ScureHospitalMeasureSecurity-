# SHMS - Security Implementation Checklist
## Kemanan Jaringan UAS IFB302

---

## ✅ Implementasi Wajib

| # | Requirement | Status | Implementasi |
|---|---|---|---|
| 1 | Password hashing | ✅ | BCrypt cost=12 (`SecurityConfig`) |
| 2 | Session management | ✅ | JWT stateless, 24h expiry (`JwtService`) |
| 3 | Validasi input | ✅ | Bean Validation + sanitasi XSS di `AuthService`, `RegisterRequest`, `LoginRequest` |
| 4 | Proteksi SQL Injection | ✅ | JPA/Hibernate parameterized queries (tidak ada native SQL raw) |
| 5 | Proteksi XSS | ✅ | CSP header + sanitasi `<>'"` di AuthService |
| 6 | CSRF protection | ✅ | Stateless JWT (tidak ada session cookie = tidak vulnerable CSRF) |
| 7 | Rate limiting / brute force | ✅ | Bucket4j: 5 req/min login, 60 req/min API (`RateLimitFilter`) |
| 8 | Role-based access control | ✅ | Spring Security roles: ADMIN, DOKTER, PASIEN, APOTEKER (`SecurityConfig`) |
| 9 | Secure file upload | ✅ | MIME validation (Apache Tika), SHA-256 hash, UUID rename (`UploadService`) |
| 10 | Logging & monitoring | ✅ | AuditLog di setiap aksi, `AuditInterceptor` untuk semua request |

## ✅ Implementasi Bonus

| # | Requirement | Status | Implementasi |
|---|---|---|---|
| 1 | JWT Security | ✅ | HMAC-SHA256, expiry check, invalid token handling |
| 2 | Enkripsi data sensitif | ✅ | AES-128-CBC + IV acak (`EncryptionUtil`), key dari env var |
| 3 | Security Headers | ✅ | X-XSS-Protection, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy |
| 4 | Error handling aman | ✅ | `GlobalExceptionHandler` - stack trace tidak pernah dikirim ke client |

## ⚙️ Konfigurasi Production

```bash
# Set environment variables sebelum jalankan
export JWT_SECRET="ganti_dengan_string_random_64_karakter"
export ENCRYPTION_KEY="ganti_16karakter"
export DB_USER="shms_user"
export DB_PASS="password_kuat"
export SERVER_PORT=80

# Jalankan
java -jar target/secure-hospital-system-1.0.jar
```

## 🔐 Akun Default (seed otomatis saat pertama run)

- Email: `admin@shms.local`
- Password: `Admin@123!`
- **SEGERA GANTI setelah login pertama!**

## 📋 Role yang Tersedia saat Register

| Role Frontend | Role Backend |
|---|---|
| Admin | ADMIN |
| Dokter | DOKTER |
| Pasien | PASIEN |
| Apoteker | APOTEKER |

