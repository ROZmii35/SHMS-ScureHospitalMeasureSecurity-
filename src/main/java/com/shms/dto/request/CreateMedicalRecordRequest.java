package com.shms.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateMedicalRecordRequest {
    @NotNull
    private Long appointmentId;
    @NotNull
    private Long patientId;
    @NotNull
    private Long doctorId;
    private String diagnosis;
    private String treatment;
    private String notes;
}