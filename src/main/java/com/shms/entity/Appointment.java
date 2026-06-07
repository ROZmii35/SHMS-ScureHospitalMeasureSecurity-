package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name="appointments")
@Getter
@Setter
public class Appointment extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long appointmentId;
    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Doctor doctor;
    private LocalDateTime appointmentDate;
    private String status;
    @Column(length=1000)
    private String complaint;
}