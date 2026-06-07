package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="audit_logs")
@Getter
@Setter
public class AuditLog {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long logId;
    @ManyToOne
    private User user;
    private String action;
    private String endpoint;
    private String ipAddress;
    private String severity;
}