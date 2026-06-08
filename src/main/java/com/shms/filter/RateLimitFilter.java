package com.shms.filter;

import io.github.bucket4j.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate Limiting per-IP menggunakan Token Bucket (Bucket4j).
 *
 * - /api/auth/** → 5 request/menit (cegah brute force login)
 * - Endpoint lain  → 60 request/menit (normal API usage)
 */
@Component
public class RateLimitFilter implements Filter {

    // Bucket terpisah untuk endpoint login/register
    private final Map<String, Bucket> authBuckets   = new ConcurrentHashMap<>();
    // Bucket umum untuk API lain
    private final Map<String, Bucket> generalBuckets = new ConcurrentHashMap<>();

    private Bucket createAuthBucket() {
        // Max 5 percobaan login per menit per IP
        return Bucket.builder()
                .addLimit(Bandwidth.simple(5, Duration.ofMinutes(1)))
                .build();
    }

    private Bucket createGeneralBucket() {
        // Max 60 request per menit per IP
        return Bucket.builder()
                .addLimit(Bandwidth.simple(60, Duration.ofMinutes(1)))
                .build();
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest  req = (HttpServletRequest)  request;
        HttpServletResponse res = (HttpServletResponse) response;

        String ip  = getClientIp(req);
        String uri = req.getRequestURI();

        boolean isAuthEndpoint = uri.startsWith("/api/auth/");
        Bucket bucket = isAuthEndpoint
                ? authBuckets.computeIfAbsent(ip, k -> createAuthBucket())
                : generalBuckets.computeIfAbsent(ip, k -> createGeneralBucket());

        if (!bucket.tryConsume(1)) {
            res.setStatus(429);
            res.setContentType("application/json");
            res.getWriter().write(
                "{\"error\":\"Too many requests. Coba lagi dalam beberapa saat.\"}");
            return;
        }

        chain.doFilter(request, response);
    }

    /** Ambil IP asli, perhatikan reverse-proxy header */
    private String getClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
