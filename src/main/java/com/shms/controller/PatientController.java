package com.shms.controller;
import com.shms.dto.request.CreatePatientRequest;
import com.shms.dto.response.PatientResponse;
import com.shms.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/patient")
@RequiredArgsConstructor
public class PatientController {
    private final PatientService patientService;
    @PostMapping
    public ResponseEntity<PatientResponse>
    createPatient(
            @Valid
            @RequestBody
            CreatePatientRequest request){
        return ResponseEntity.ok(
                patientService.create(request)
        );
    }
}