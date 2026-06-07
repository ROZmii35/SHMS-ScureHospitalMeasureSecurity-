package com.shms.service;
import com.shms.entity.AuditLog;
import com.shms.entity.User;
import com.shms.repository.AuditLogRepository;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuditLogService {
    private final AuditLogRepository auditRepository;
    private final UserRepository userRepository;
    public void log(
            String action,
            String endpoint,
            String ip,
            String severity
    ){
        try{
            String email =
                    SecurityContextHolder
                            .getContext()
                            .getAuthentication()
                            .getName();
            User user =
                    userRepository
                            .findByEmail(email)
                            .orElse(null);
            AuditLog audit =
                    new AuditLog();
            audit.setUser(user);
            audit.setAction(
                    action
            );
            audit.setEndpoint(
                    endpoint
            );
            audit.setIpAddress(
                    ip
            );
            audit.setSeverity(
                    severity
            );
            auditRepository.save(
                    audit
            );
        }catch(Exception ignored){
        }
    }

}