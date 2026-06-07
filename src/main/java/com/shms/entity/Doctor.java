package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="doctors")
@Getter
@Setter
public class Doctor extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long doctorId;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
    private String specialization;
    @Column(unique=true)
    private String licenseNumber;
    @Column(length=1000)
    private String scheduleInfo;
}