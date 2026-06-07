package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MedicalRecordResponse {
    private Long recordId;
    private String patientName;
    private String doctorName;
    private String diagnosis;
    private String treatment;
}