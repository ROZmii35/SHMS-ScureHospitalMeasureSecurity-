package com.shms.service;

import com.shms.dto.*;
import com.shms.dto.request.*;
import com.shms.entity.*;
import com.shms.repository.*;
import com.shms.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public String register(RegisterRequest request) {
        Role role = roleRepository.findByRoleName(
                        request.getRole())
                .orElseThrow();
        User user = User.builder()
                .fullname(request.getFullname())
                .email(request.getEmail())
                .passwordHash(
                        passwordEncoder.encode(
                                request.getPassword()))
                .role(role)
                .build();
        userRepository.save(user);
        return "Register success";
    }
    public String login(LoginRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        return jwtService.generateToken(
                request.getEmail()
        );
    }
}