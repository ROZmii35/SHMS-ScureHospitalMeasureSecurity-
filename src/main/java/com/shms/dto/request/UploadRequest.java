package com.shms.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UploadRequest {
    @NotNull
    private Long patientId;
    private Long medicalRecordId;
    private String category;
    private String description;
}