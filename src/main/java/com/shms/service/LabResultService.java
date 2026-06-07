package com.shms.service;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.shms.entity.LabResult;
import com.shms.repository.LabResultRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LabResultService {
    private final LabResultRepository repo;
    @Value("${upload.path}")   // GANTI hardcoded path
    private String uploadDir;
    private final List<String> ALLOWED_EXTENSIONS =
        List.of("pdf", "jpg", "jpeg", "png");
    private final List<String> ALLOWED_MIME_TYPES =
        List.of("application/pdf", "image/jpeg", "image/png");
    public LabResult saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) throw new RuntimeException("File tidak boleh kosong");
        String originalName = file.getOriginalFilename();
        if (originalName == null || !originalName.contains("."))
            throw new RuntimeException("Nama file tidak valid");
        String extension = originalName
            .substring(originalName.lastIndexOf(".") + 1).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension))
            throw new RuntimeException("Format file tidak diizinkan");
        if (!ALLOWED_MIME_TYPES.contains(file.getContentType()))
            throw new RuntimeException("MIME Type tidak valid");
        if (file.getSize() > 5 * 1024 * 1024)
            throw new RuntimeException("Ukuran file maksimal 5 MB");
        Files.createDirectories(Paths.get(uploadDir));
        String randomName = UUID.randomUUID() + "." + extension;
        Path filepath = Paths.get(uploadDir, randomName);
        file.transferTo(filepath.toFile());
        LabResult labResult = new LabResult();
        labResult.setFileName(randomName);
        labResult.setFileType(file.getContentType());
        labResult.setFileSize(file.getSize());
        labResult.setFilePath(filepath.toString());
        return repo.save(labResult);
    }
}
