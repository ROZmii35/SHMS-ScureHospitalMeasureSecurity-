package com.shms.controller;
import com.shms.dto.response.SecurityDashboardResponse;
import com.shms.service.MonitoringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/monitor")
@RequiredArgsConstructor
public class MonitoringController {
    private final MonitoringService monitoringService;
    @GetMapping("/dashboard")
    public ResponseEntity<SecurityDashboardResponse> dashboard() {
        return ResponseEntity.ok(monitoringService.dashboard());
    }
}
