package com.shms.scheduler;
import com.shms.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class SecurityMonitorScheduler {
    private final LoginAttemptRepository loginRepo;
    @Scheduled(fixedRate = 300000)
    public void monitorBlockedUsers(){
        long blocked = loginRepo.countByBlockedTrue();
        if(blocked > 0){
            log.warn(
                    "Blocked accounts: {}",
                    blocked
            );
        }
    }
}