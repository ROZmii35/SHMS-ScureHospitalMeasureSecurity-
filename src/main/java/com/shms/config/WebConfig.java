package com.shms.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuditInterceptor interceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor);
    }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**")
                .addResourceLocations("classpath:/static/assets/");
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");
    }

    /**
     * CORS: izinkan frontend Vite dev server (localhost:5173) saat development.
     * Di production frontend sudah jadi satu dengan backend (static files),
     * sehingga request adalah same-origin dan tidak butuh CORS sama sekali.
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOriginPatterns(
                    "http://localhost:*",   // Semua port localhost (Vite, dll)
                    "http://127.0.0.1:*",   // localhost via IP
                    "http://localhost",
                    "http://localhost:80",
		    "https://akuwaras.tail9dbf04.ts.net" // Khusus Jaringan Tailscale Funnel
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false)
                .maxAge(3600);
    }

    /** Semua route SPA (non-API, non-asset) diarahkan ke index.html */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // Tangani deep links React Router
        registry.addViewController("/{path:[^\\.]*}")
                .setViewName("forward:/index.html");
    }
}
