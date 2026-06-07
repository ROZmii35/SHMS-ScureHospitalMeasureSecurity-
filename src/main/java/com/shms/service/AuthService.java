package com.shms.service;
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
    private final LoginAttemptService attemptService;
    public String register(RegisterRequest request) {
        Role role = roleRepository.findByRoleName(
                        request.getRole()
                )
                .orElseThrow();
        User user = User.builder()
                .fullname(
                        request.getFullname()
                )
                .email(
                        request.getEmail()
                )
                .passwordHash(
                        passwordEncoder.encode(
                                request.getPassword()
                        )
                )
                .role(
                        role
                )
                .build();
        userRepository.save(
                user
        );
        return "Register success";
    }
    public String login(LoginRequest request) {
        if(attemptService.isBlocked(request.getEmail())){
            throw new RuntimeException("Account temporarily blocked");
        } try{
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            attemptService.loginSuccess(request.getEmail());
            String token = jwtService.generateToken(request.getEmail());
            return token;
        }catch(Exception e){
            attemptService.loginFailed(request.getEmail());
            throw new RuntimeException("Invalid credentials");
        }
    }
}