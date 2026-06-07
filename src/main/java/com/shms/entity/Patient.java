package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name="patients")
@Getter
@Setter
public class Patient extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long patientId;
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;
    @Column(unique=true)
    private String nik;
    private LocalDate birthDate;
    private String gender;
    private String bloodType;
    private String emergencyContact;
}