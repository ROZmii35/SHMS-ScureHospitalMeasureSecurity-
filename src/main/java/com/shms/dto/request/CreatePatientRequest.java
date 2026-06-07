package com.shms.dto.request;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;

@Data
public class CreatePatientRequest {
    @NotBlank
    private String nik;
    private LocalDate birthDate;
    private String gender;
    private String bloodType;
    private String emergencyContact;
    private Long userId;
}