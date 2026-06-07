package com.shms.filter;
import io.github.bucket4j.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter
implements Filter {
    private final Map<String, Bucket>buckets = new ConcurrentHashMap<>();
    private Bucket createBucket(){
        Bandwidth limit =
                Bandwidth.simple(
                        10,
                        Duration.ofMinutes(
                                1
                        )
                );
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    @Override
    public void doFilter(
            ServletRequest request,
            ServletResponse response,
            FilterChain chain
    )
    throws IOException,
            ServletException {
        HttpServletRequest req =
                (HttpServletRequest)
                        request;
         // NONAKTIFKAN RATE LIMIT SEMENTARA
        if (true) {
                chain.doFilter(request, response);
                return;
        }
        HttpServletResponse res =
                (HttpServletResponse)
                        response;
                        
        String ip =
                req.getRemoteAddr();
        Bucket bucket =
                buckets.computeIfAbsent(
                        ip,
                        k -> createBucket()
                );
        if(!bucket.tryConsume(1)){
            res.setStatus(429);
            res.getWriter()
                    .write(
                            "Too many requests"
                    );
            return;
        }
        chain.doFilter(
                request,
                response
        );
    }
}