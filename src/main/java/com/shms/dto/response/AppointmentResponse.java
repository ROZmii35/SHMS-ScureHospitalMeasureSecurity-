package com.shms.dto.response;
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Builder
public class AppointmentResponse {
    private Long appointmentId;
    private String patientName;
    private String doctorName;
    private LocalDateTime appointmentDate;
    private String status;
}