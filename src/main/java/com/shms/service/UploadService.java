package com.shms.service;
import com.shms.dto.request.UploadRequest;
import com.shms.dto.response.UploadResponse;
import com.shms.entity.UploadedFile;
import com.shms.entity.User;
import com.shms.repository.UploadedFileRepository;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.MessageDigest;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UploadService {
    private final UploadedFileRepository fileRepository;
    private final UserRepository userRepository;
    private final AuditLogService auditService;
    @Value("${upload.path}")
    private String uploadPath;
    private static final Set<String> ALLOWED_TYPES =
            Set.of(
                    "application/pdf",
                    "image/png",
                    "image/jpeg"
            );
    public UploadResponse upload(
            UploadRequest request,
            MultipartFile file
    ) throws Exception {
        /*
         * EMPTY CHECK
         */
        if (file.isEmpty()) {
            throw new RuntimeException(
                    "File empty"
            );
        }
        /*
         * ORIGINAL NAME CHECK
         */
        String originalName = file.getOriginalFilename();
        if (originalName == null || originalName.isBlank()) {
            throw new RuntimeException("Invalid filename");
        }
        /*
         * MIME VALIDATION
         */
        Tika tika = new Tika();
        String mimeType =
                tika.detect(
                        file.getInputStream()
                );
        if (!ALLOWED_TYPES.contains(mimeType)) {
            throw new RuntimeException(
                    "File type not allowed"
            );
        }
        /*
         * HASHING
         */
        String hash =
                sha256(
                        file.getBytes()
                );
        /*
         * DUPLICATE FILE CHECK
         */
        Optional<UploadedFile> duplicate =
                fileRepository.findByFileHash(
                        hash
                );
        if (duplicate.isPresent()) {
            throw new RuntimeException(
                    "Duplicate file detected"
            );
        }
        /*
         * SANITIZE FILE NAME
         */
        String safeName =
                originalName.replaceAll(
                        "[^a-zA-Z0-9._-]",
                        "_"
                );
        String storedName =
                UUID.randomUUID()
                        + "_"
                        + safeName;
        /*
         * DIRECTORY CREATION
         */
        Path uploadDir =
                Paths.get(uploadPath);
        Files.createDirectories(
                uploadDir
        );
        /*
         * FILE SAVE
         */
        Path destination =
                uploadDir.resolve(
                        storedName
                );
        Files.write(
                destination,
                file.getBytes()
        );
        /*
         * GET AUTH USER
         */
        String email =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName();
        User uploader =
                userRepository
                        .findByEmail(
                                email
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Uploader not found"
                                )
                        );
        /*
         * SAVE DB
         */
        UploadedFile uploaded =
                new UploadedFile();
        uploaded.setUploader(
                uploader
        );
        uploaded.setOriginalName(
                originalName
        );
        uploaded.setStoredName(
                storedName
        );
        uploaded.setMimeType(
                mimeType
        );
        uploaded.setFileHash(
                hash
        );
        uploaded.setFileSize(
                file.getSize()
        );
        uploaded.setPatientId(
                request.getPatientId()
        );
        uploaded.setMedicalRecordId(
                request.getMedicalRecordId()
        );
        uploaded.setCategory(
                request.getCategory()
        );
        uploaded.setDescription(
                request.getDescription()
        );
        uploaded.setIsScanned(
                false
        );
        fileRepository.save(
                uploaded
        );
        auditService.log(
                "UPLOAD_FILE",
                "/api/upload",
                "SYSTEM",
                "MEDIUM"
        );
        /*
         * RESPONSE
         */
        return UploadResponse.builder()
                .fileId(
                        uploaded.getFileId()
                )
                .originalName(
                        uploaded.getOriginalName()
                )
                .storedName(
                        uploaded.getStoredName()
                )
                .hash(
                        uploaded.getFileHash()
                )
                .build();
    }
    private String sha256(
            byte[] data
    ) throws Exception {
        MessageDigest md =
                MessageDigest.getInstance(
                        "SHA-256"
                );
        byte[] digest =
                md.digest(
                        data
                );
        StringBuilder sb =
                new StringBuilder();
        for (byte b : digest) {
            sb.append(
                    String.format(
                            "%02x",
                            b
                    )
            );
        }
        return sb.toString();
    }
}