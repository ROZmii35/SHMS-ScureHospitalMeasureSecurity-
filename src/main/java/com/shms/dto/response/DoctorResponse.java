package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DoctorResponse {
    private Long doctorId;
    private String fullname;
    private String specialization;
    private String licenseNumber;
}