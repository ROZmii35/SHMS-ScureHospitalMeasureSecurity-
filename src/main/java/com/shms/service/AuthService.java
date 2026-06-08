package com.shms.service;

import com.shms.config.AuditInterceptor;
import com.shms.dto.request.*;
import com.shms.entity.*;
import com.shms.repository.*;
import com.shms.security.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository       userRepository;
    private final RoleRepository       roleRepository;
    private final PasswordEncoder      passwordEncoder;
    private final JwtService           jwtService;
    private final AuthenticationManager authManager;
    private final LoginAttemptService  attemptService;
    private final AuditLogService      auditLogService;

    public String register(RegisterRequest request) {
        // Cegah duplikat email
        if (userRepository.findByEmail(request.getEmail().toLowerCase()).isPresent()) {
            throw new RuntimeException("Email sudah terdaftar");
        }

        Role role = roleRepository.findByRoleName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role tidak valid: " + request.getRole()));

        User user = User.builder()
                .fullname(sanitize(request.getFullname()))
                .email(request.getEmail().toLowerCase().trim())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .isActive(true)
                .mfaEnabled(false)
                .build();

        userRepository.save(user);
        auditLogService.log("REGISTER", "/api/auth/register", request.getEmail(), "LOW");
        log.info("User registered: {}", request.getEmail());
        return "Register berhasil";
    }

    public String login(LoginRequest request) {
        String email = request.getEmail().toLowerCase().trim();

        // Cek apakah IP/email di-block karena terlalu banyak gagal
        if (attemptService.isBlocked(email)) {
            auditLogService.log("LOGIN_BLOCKED", "/api/auth/login", email, "HIGH");
            throw new RuntimeException("Akun sementara diblokir karena terlalu banyak percobaan login. Coba lagi dalam 15 menit.");
        }

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, request.getPassword())
            );

            attemptService.loginSuccess(email);
            String token = jwtService.generateToken(email);
            auditLogService.log("LOGIN_SUCCESS", "/api/auth/login", email, "LOW");
            log.info("Login success: {}", email);
            return token;

        } catch (BadCredentialsException e) {
            attemptService.loginFailed(email);
            auditLogService.log("LOGIN_FAILED", "/api/auth/login", email, "MEDIUM");
            log.warn("Login failed for: {}", email);
            // Pesan generik - jangan bocorkan apakah email ada atau tidak
            throw new RuntimeException("Email atau password salah");
        } catch (Exception e) {
            attemptService.loginFailed(email);
            auditLogService.log("LOGIN_ERROR", "/api/auth/login", email, "HIGH");
            throw new RuntimeException("Email atau password salah");
        }
    }

    /** Sanitasi input untuk cegah XSS / HTML injection */
    private String sanitize(String input) {
        if (input == null) return "";
        return input.trim()
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&#x27;");
    }
}
