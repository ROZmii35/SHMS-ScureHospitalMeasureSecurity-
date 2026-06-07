package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="prescription_items")
@Getter
@Setter
public class PrescriptionItem {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long itemId;
    @ManyToOne
    private Prescription prescription;
    private String medicineName;
    private String dosage;
    private Integer quantity;
}