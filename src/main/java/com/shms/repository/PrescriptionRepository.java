package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    
}
