package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="prescriptions")
@Getter
@Setter
public class Prescription {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long prescriptionId;
    @ManyToOne
    private MedicalRecord record;
    @ManyToOne
    private Doctor doctor;
}