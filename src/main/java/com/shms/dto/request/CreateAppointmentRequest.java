package com.shms.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CreateAppointmentRequest {
    @NotNull
    private Long patientId;
    @NotNull
    private Long doctorId;
    @NotNull
    private LocalDateTime appointmentDate;
    private String complaint;
}