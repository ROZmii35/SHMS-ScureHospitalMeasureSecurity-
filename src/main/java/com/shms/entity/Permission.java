package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="permissions")
@Getter
@Setter
public class Permission {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long permissionId;
    private String permissionName;
}
