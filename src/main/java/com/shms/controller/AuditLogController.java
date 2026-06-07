package com.shms.controller;
import com.shms.entity.AuditLog;
import com.shms.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/audit-log")
@RequiredArgsConstructor
public class AuditLogController {
    private final AuditLogRepository auditLogRepository;
    @GetMapping
    public ResponseEntity<List<AuditLog>> getAll() {
        return ResponseEntity.ok(
            auditLogRepository.findTop10ByOrderByCreatedAtDesc()
        );
    }
}
