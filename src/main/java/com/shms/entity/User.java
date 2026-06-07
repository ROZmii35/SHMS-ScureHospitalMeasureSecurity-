package com.shms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
    name="users",
    indexes = {
        @Index(name="idx_email",columnList="email")
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long userId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="role_id")
    private Role role;
    @Column(nullable=false)
    private String fullname;
    @Column(nullable=false,unique=true)
    private String email;
    @Column(nullable=false)
    private String passwordHash;
    private Boolean isActive;
    private Boolean mfaEnabled;
    public static Object builder() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'builder'");
    }
}