package com.shms.config;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
@RequiredArgsConstructor
public class WebConfig
implements WebMvcConfigurer {
    private final AuditInterceptor interceptor;
    @SuppressWarnings("null")
    @Override
    public void addInterceptors(
            @SuppressWarnings("null") InterceptorRegistry registry
    ){
        registry.addInterceptor(
                interceptor
        );
    }

}