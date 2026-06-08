package com.shms.config;

import com.shms.entity.Role;
import com.shms.entity.User;
import com.shms.repository.RoleRepository;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seed data awal saat aplikasi pertama dijalankan:
 * - 4 Role: ADMIN, DOKTER, PASIEN, APOTEKER
 * - 1 Akun admin default (GANTI password setelah login pertama!)
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final RoleRepository  roleRepository;
    private final UserRepository  userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedRoles();
        seedAdminUser();
    }

    private void seedRoles() {
        List<String> roles = List.of("ADMIN", "DOKTER", "PASIEN", "APOTEKER", "PERAWAT");
        for (String roleName : roles) {
            if (roleRepository.findByRoleName(roleName).isEmpty()) {
                Role role = new Role();
                role.setRoleName(roleName);
                roleRepository.save(role);
                log.info("Seeded role: {}", roleName);
            }
        }
    }

    private void seedAdminUser() {
        String adminEmail = "admin@shms.local";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            Role adminRole = roleRepository.findByRoleName("ADMIN")
                    .orElseThrow(() -> new RuntimeException("Role ADMIN tidak ditemukan"));

            User admin = User.builder()
                    .fullname("Administrator")
                    .email(adminEmail)
                    .passwordHash(passwordEncoder.encode("Admin@123!"))
                    .role(adminRole)
                    .isActive(true)
                    .mfaEnabled(false)
                    .build();

            userRepository.save(admin);
            log.warn("========================================================");
            log.warn("  Akun admin default dibuat:");
            log.warn("  Email   : {}", adminEmail);
            log.warn("  Password: Admin@123!");
            log.warn("  SEGERA GANTI password setelah login pertama!");
            log.warn("========================================================");
        }
    }
}
