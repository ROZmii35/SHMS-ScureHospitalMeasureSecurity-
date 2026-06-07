package com.shms.service;
import com.shms.entity.LoginAttempt;
import com.shms.repository.LoginAttemptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LoginAttemptService {
    private final LoginAttemptRepository repository;
    private static final int MAX_ATTEMPTS = 5;
    public void loginFailed(
            String email
    ){
        LoginAttempt attempt =
                repository.findByEmail(
                        email
                )
                .orElseGet(() -> {
                    LoginAttempt a =
                            new LoginAttempt();
                    a.setEmail(email);
                    a.setFailedCount(0);
                    a.setBlocked(false);
                    return a;
                });
        int failed = attempt.getFailedCount() + 1;
        attempt.setFailedCount(failed);
        if(failed >= MAX_ATTEMPTS){
            attempt.setBlocked(
                    true
            );
            attempt.setBlockedUntil(
                    LocalDateTime.now()
                            .plusMinutes(
                                    15
                            )
            );
        }
        attempt.setSuccess(
                false
        );
        repository.save(
                attempt
        );
    }
    public void loginSuccess(String email){
        LoginAttempt attempt =
                repository.findByEmail(
                        email
                )
                .orElse(null);
        if(attempt == null){
            return;
        }
        attempt.setFailedCount(
                0
        );
        attempt.setBlocked(
                false
        );
        attempt.setBlockedUntil(
                null
        );
        attempt.setSuccess(
                true
        );
        repository.save(
                attempt
        );
    }
    public boolean isBlocked(
            String email
    ){
        LoginAttempt attempt =
                repository.findByEmail(
                        email
                )
                .orElse(null);
        if(attempt == null){
            return false;
        }
        if(Boolean.FALSE.equals(
                attempt.getBlocked()
        )){
            return false;
        }
        if(
           attempt.getBlockedUntil()
                   .isBefore(
                           LocalDateTime.now()
                   )
        ){
            attempt.setBlocked(
                    false
            );
            attempt.setFailedCount(
                    0
            );
            repository.save(
                    attempt
            );
            return false;
        }
        return true;
    }
}