package com.shms.controller;
import com.shms.dto.request.UploadRequest;
import com.shms.dto.response.UploadResponse;
import com.shms.service.UploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {
    private final UploadService service;
    @PostMapping(
            consumes = {
                    "multipart/form-data"
            }
    )
    public ResponseEntity<UploadResponse> upload(
            @RequestPart("metadata")
            UploadRequest request,
            @RequestPart("file")
            MultipartFile file
    ) throws Exception {
        return ResponseEntity.ok(
                service.upload(
                        request,
                        file
                )
        );
    }
}