package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.LoginAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface LoginAttemptRepository extends JpaRepository<LoginAttempt, Long> {
    Optional<LoginAttempt>findByEmail(String email);
    long countByBlockedTrue();
}
