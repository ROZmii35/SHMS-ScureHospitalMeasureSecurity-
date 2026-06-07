package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="notifications")
@Getter
@Setter
public class Notification {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long notificationId;
    @ManyToOne
    private AuditLog log;
    private String sentTo;
    private String status;
}