package com.shms.controller;
import com.shms.dto.request.CreateMedicalRecordRequest;
import com.shms.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/medical-record")
@RequiredArgsConstructor
public class MedicalRecordController {
    private final MedicalRecordService service;
    @PostMapping
    public ResponseEntity<?> create(
            @Valid
            @RequestBody
            CreateMedicalRecordRequest request
    ){
        return ResponseEntity.ok(
                service.create(request)
        );
    }
}
