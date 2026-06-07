package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
    boolean existsByNik(String nik);
}
