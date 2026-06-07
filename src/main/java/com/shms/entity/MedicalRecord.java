package com.shms.entity;
import java.time.LocalDate;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="medical_records")
@Getter
@Setter
public class MedicalRecord extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long recordId;
    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Doctor doctor;
    @OneToOne
    @JoinColumn(name="appointment_id")
    private Appointment appointment;
    @Column(length=3000)
    private String diagnosis;
    @Column(length=3000)
    private String treatment;
    @Lob
    private String notesEncrypted;
}