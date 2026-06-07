package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PatientResponse {
    private Long patientId;
    private String fullname;
    private String nik;
    private String bloodType;
    private String gender;
}