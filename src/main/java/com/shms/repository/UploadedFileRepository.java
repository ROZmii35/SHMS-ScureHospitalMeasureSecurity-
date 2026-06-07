package com.shms.repository;
import com.shms.entity.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {
    Optional<UploadedFile>findByFileHash(String hash);
}
