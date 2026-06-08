package com.shms.security;

import com.shms.entity.User;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found"));

        boolean active = Boolean.TRUE.equals(user.getIsActive());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                active,   // enabled — user tidak aktif = tidak bisa login
                true,     // accountNonExpired
                true,     // credentialsNonExpired
                true,     // accountNonLocked
                List.of(
                        new SimpleGrantedAuthority(
                                "ROLE_" + user.getRole().getRoleName()
                        )
                )
        );
    }
}
