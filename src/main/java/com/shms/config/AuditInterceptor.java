package com.shms.config;
import com.shms.service.AuditLogService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AuditInterceptor
implements HandlerInterceptor {
    private final AuditLogService service;
    @Override
    public boolean preHandle(
            @SuppressWarnings("null") HttpServletRequest request,
            @SuppressWarnings("null") HttpServletResponse response,
            @SuppressWarnings("null") Object handler
    ){
        String endpoint =
                request.getRequestURI();
        String ip =
                request.getRemoteAddr();
        service.log(
                "ACCESS",
                endpoint,
                ip,
                "LOW"
        );
        return true;
    }

}