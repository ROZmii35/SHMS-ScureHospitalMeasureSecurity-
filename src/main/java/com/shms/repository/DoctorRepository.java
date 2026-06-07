package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    boolean existsByLicenseNumber(String licenseNumber);
    Optional<Doctor>findByUserUserId(Long userId);
}
