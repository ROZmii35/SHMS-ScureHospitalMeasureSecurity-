package com.shms.service;
import com.shms.dto.response.SecurityDashboardResponse;
import com.shms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MonitoringService {
    private final AuditLogRepository auditRepository;
    private final LoginAttemptRepository loginRepository;
    private final UploadedFileRepository fileRepository;
    public SecurityDashboardResponse dashboard(){
        long highLogs =
                auditRepository.countBySeverity(
                        "HIGH"
                );
        long blockedUsers = loginRepository.countByBlockedTrue();
        long unscanned = fileRepository.countByIsScannedFalse();
        long recentLogs =
                auditRepository
                        .findTop10ByOrderByCreatedAtDesc()
                        .size();
        return SecurityDashboardResponse
                .builder()
                .highSeverityLogs(
                        highLogs
                )
                .blockedAccounts(
                        blockedUsers
                )
                .unscannedFiles(
                        unscanned
                )
                .recentLogs(
                        recentLogs
                )
                .build();
    }
}