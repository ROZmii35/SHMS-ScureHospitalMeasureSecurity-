package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {
    
}
