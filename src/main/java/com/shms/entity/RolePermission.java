package com.shms.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="role_permissions")
@Getter
@Setter
public class RolePermission {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Role role;
    @ManyToOne
    private Permission permission;
}