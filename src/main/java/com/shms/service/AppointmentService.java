package com.shms.service;
import com.shms.dto.request.CreateAppointmentRequest;
import com.shms.dto.response.AppointmentResponse;
import com.shms.entity.*;
import com.shms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    public AppointmentResponse create(CreateAppointmentRequest request){
        @SuppressWarnings("null")
        Patient patient =
                patientRepository.findById(
                        request.getPatientId()
                ).orElseThrow();
        @SuppressWarnings("null")
        Doctor doctor =
                doctorRepository.findById(
                        request.getDoctorId()
                ).orElseThrow();
        boolean conflict =
                appointmentRepository
                        .existsByDoctorDoctorIdAndAppointmentDate(
                                doctor.getDoctorId(),
                                request.getAppointmentDate()
                        );
        if(conflict){
            throw new RuntimeException(
                    "Doctor schedule conflict"
            );
        }
        Appointment appointment =
                new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setAppointmentDate(
                request.getAppointmentDate()
        );
        appointment.setComplaint(
                request.getComplaint()
        );
        appointment.setStatus(
                "PENDING"
        );
        appointmentRepository.save(
                appointment
        );
        return AppointmentResponse.builder()
                .appointmentId(
                        appointment.getAppointmentId()
                )
                .patientName(
                        patient.getUser()
                                .getFullname()
                )
                .doctorName(
                        doctor.getUser()
                                .getFullname()
                )
                .appointmentDate(
                        appointment.getAppointmentDate()
                )
                .status(
                        appointment.getStatus()
                )
                .build();
        }
}