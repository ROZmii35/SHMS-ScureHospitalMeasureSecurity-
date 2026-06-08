package com.shms.config;

import com.shms.filter.RateLimitFilter;
import com.shms.security.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;
    private final RateLimitFilter rateLimitFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // ── CORS: aktifkan agar WebConfig.addCorsMappings() dipakai ──
            .cors(cors -> {})

            // ── CSRF: disabled karena stateless JWT ──────────────────
            .csrf(csrf -> csrf.disable())

            // ── Session stateless ─────────────────────────────────────
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // ── Security Headers ──────────────────────────────────────
            .headers(headers -> headers
                .xssProtection(xss -> xss
                    .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline'; " +
                        "style-src 'self' 'unsafe-inline'; " +
                        "img-src 'self' data:; " +
                        "font-src 'self'; " +
                        // FIX: tambah ws: agar Vite HMR tidak diblokir CSP saat dev
                        "connect-src 'self' ws://localhost:* http://localhost:*"))
                .frameOptions(frame -> frame.deny())
                .contentTypeOptions(ct -> {})
                .referrerPolicy(ref -> ref
                    .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
            )

            // ── Pasang DaoAuthenticationProvider ─────────────────────
            .authenticationProvider(authenticationProvider())

            // ── Authorization ─────────────────────────────────────────
            .authorizeHttpRequests(auth -> auth
                // Public: static assets, auth endpoints
                .requestMatchers(
                    "/", "/index.html", "/assets/**", "/vite.svg",
                    "/pages/login.html", "/pages/register.html",
                    // FIX: pastikan OPTIONS preflight selalu lolos
                    "/api/auth/login", "/api/auth/register",
                    "/api/auth/**",
                    "/v3/api-docs/**", "/swagger-ui/**"
                ).permitAll()
                .requestMatchers(
                    "/pages/dashboard.html",
                    "/pages/appointments.html",
                    "/pages/patients.html",
                    "/pages/doctors.html",
                    "/pages/medical-records.html",
                    "/pages/lab-results.html"
                ).permitAll()   // FIX: HTML halaman SPA harus permitAll, auth dijaga JS+API
                .requestMatchers("/api/users/me").authenticated()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/doctor/**").hasAnyRole("PERAWAT", "ADMIN")
                .requestMatchers("/api/monitor/**").hasRole("ADMIN")
                .requestMatchers("/api/patient/**").hasAnyRole("PASIEN", "DOKTER", "PERAWAT")
                .requestMatchers("/api/appointment/**").hasAnyRole("ADMIN", "PERAWAT", "PASIEN")
                .requestMatchers("/api/medical-record/**").hasAnyRole("ADMIN", "DOKTER")
                .requestMatchers("/api/upload/**").hasAnyRole("ADMIN", "DOKTER", "PERAWAT")
                .anyRequest().authenticated()
            )

            // ── Filter chain ──────────────────────────────────────────
            .addFilterBefore(rateLimitFilter, UsernamePasswordAuthenticationFilter.class)
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
