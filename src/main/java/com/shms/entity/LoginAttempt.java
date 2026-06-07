package com.shms.entity;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="login_attempts")
@Getter
@Setter
public class LoginAttempt {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long attemptId;
    private String email;
    private Integer failedCount;
    private String ipAddress;
    private Boolean blocked;
    private LocalDateTime blockedUntil;
    private Boolean success;
}