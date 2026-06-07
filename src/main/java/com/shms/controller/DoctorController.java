package com.shms.controller;
import com.shms.dto.request.CreateDoctorRequest;
import com.shms.dto.response.DoctorResponse;
import com.shms.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
public class DoctorController {
    private final DoctorService doctorService;
    @PostMapping
    public ResponseEntity<DoctorResponse>
    createDoctor(
            @Valid
            @RequestBody
            CreateDoctorRequest request
    ){
        return ResponseEntity.ok(
                doctorService.create(request)
        );
    }
}