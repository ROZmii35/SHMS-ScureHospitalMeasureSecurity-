package com.shms.dto.request;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateDoctorRequest {
    @NotNull
    private Long userId;
    @NotBlank
    private String specialization;
    @NotBlank
    private String licenseNumber;
    private String scheduleInfo;
}