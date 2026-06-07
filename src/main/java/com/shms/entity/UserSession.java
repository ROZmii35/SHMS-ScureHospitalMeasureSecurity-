package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="user_sessions")
@Getter
@Setter
public class UserSession {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long sessionId;
    @ManyToOne
    private User user;
    private String jwtId;
    private String ipAddress;
    private LocalDateTime loginTime;
    private LocalDateTime expiresAt;
}
