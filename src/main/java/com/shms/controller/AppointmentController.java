package com.shms.controller;
import com.shms.dto.request.CreateAppointmentRequest;
import com.shms.dto.response.AppointmentResponse;
import com.shms.entity.Appointment;
import com.shms.repository.AppointmentRepository;
import com.shms.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/appointment")
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final AppointmentRepository appointmentRepository;
    @PostMapping
    public ResponseEntity<AppointmentResponse> create(
            @Valid @RequestBody CreateAppointmentRequest request) {
        return ResponseEntity.ok(appointmentService.create(request));
    }
    @GetMapping
    public ResponseEntity<List<Appointment>> getAll() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }
}
