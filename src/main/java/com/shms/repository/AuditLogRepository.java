package com.shms.repository;
import com.shms.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog>findBySeverity(String severity);
    long countBySeverity(String severity);List<AuditLog>findTop10ByOrderByCreatedAtDesc();
}
