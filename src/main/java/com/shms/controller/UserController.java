package com.shms.controller;

import com.shms.entity.User;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserRepository userRepository;

    /**
     * Digunakan oleh frontend setelah login untuk ambil data profile lengkap.
     * Diperlukan karena JWT hanya menyimpan email, bukan role/nama.
     */
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(Authentication auth) {
        if (auth == null || !auth.isAuthenticated()) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }

        return userRepository.findByEmail(auth.getName())
                .map(user -> ResponseEntity.ok(Map.of(
                        "id",    user.getUserId(),
                        "name",  user.getFullname(),
                        "email", user.getEmail(),
                        "role",  user.getRole().getRoleName().toLowerCase()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}
