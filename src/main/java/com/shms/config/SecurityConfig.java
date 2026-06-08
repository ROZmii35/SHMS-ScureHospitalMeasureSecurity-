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

    /**
     * FIX: Wiring UserDetailsService + PasswordEncoder ke AuthenticationManager.
     * Tanpa bean ini Spring tidak tahu pakai DB → login selalu gagal.
     */
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
            // ── CSRF: disabled karena stateless JWT ──────────────────
            .csrf(csrf -> csrf.disable())

            // ── Session stateless ─────────────────────────────────────
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // ── Security Headers (XSS, Clickjacking, MIME sniff) ─────
            .headers(headers -> headers
                .xssProtection(xss -> xss
                    .headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK))
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline'; " +
                        "style-src 'self' 'unsafe-inline'; " +
                        "img-src 'self' data:; " +
                        "font-src 'self'; " +
                        "connect-src 'self'"))
                .frameOptions(frame -> frame.deny())
                .contentTypeOptions(ct -> {})
                .referrerPolicy(ref -> ref
                    .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN))
            )

            // ── Pasang DaoAuthenticationProvider ─────────────────────
            .authenticationProvider(authenticationProvider())

            // ── Authorization ─────────────────────────────────────────
            .authorizeHttpRequests(auth -> auth
                // Static resources & halaman publik (tidak perlu login)
                .requestMatchers(
                    "/", "/index.html", "/assets/**", "/vite.svg",
                    // Halaman auth di /pages/ (login & register bisa diakses tanpa token)
                    "/pages/login.html", "/pages/register.html",
                    // REST API auth (login/register endpoint)
                    "/api/auth/**",
                    // Swagger / API docs
                    "/v3/api-docs/**", "/swagger-ui/**"
                ).permitAll()
                // Halaman protected di /pages/ – HTML-nya boleh diakses (JS yg akan
                // redirect ke login kalau token tidak valid), keamanan data tetap
                // dijaga oleh JWT di level API
                .requestMatchers(
                    "/pages/dashboard.html",
                    "/pages/appointments.html",
                    "/pages/patients.html",
                    "/pages/doctors.html",
                    "/pages/medical-records.html",
                    "/pages/lab-results.html"
                ).authenticated()
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
        return new BCryptPasswordEncoder(12); // cost factor 12 lebih aman dari default 10
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
