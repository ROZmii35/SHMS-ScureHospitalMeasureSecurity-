package com.shms.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.shms.entity.LabResult;

public interface LabResultRepository extends JpaRepository<LabResult,Long>{
    
}
