package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SecurityDashboardResponse {
    private long highSeverityLogs;
    private long blockedAccounts;
    private long unscannedFiles;
    private long recentLogs;
}