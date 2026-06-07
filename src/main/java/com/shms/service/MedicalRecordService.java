package com.shms.service;
import com.shms.dto.request.CreateMedicalRecordRequest;
import com.shms.dto.response.MedicalRecordResponse;
import com.shms.entity.*;
import com.shms.repository.*;
import com.shms.util.EncryptionUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {
    private final MedicalRecordRepository medicalRecordRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final AuditLogService auditService;
    public MedicalRecordResponse create(CreateMedicalRecordRequest request){
        if(medicalRecordRepository.existsByAppointmentAppointmentId(request.getAppointmentId())){
            throw new RuntimeException("Medical record exists");
        }
        @SuppressWarnings("null")
        Appointment appointment = appointmentRepository.findById(
                    request.getAppointmentId()
                ).orElseThrow();
        @SuppressWarnings("null")
        Patient patient = patientRepository.findById(
                    request.getPatientId()
                ).orElseThrow();
        @SuppressWarnings("null")
        Doctor doctor = doctorRepository.findById(
                    request.getDoctorId()
                ).orElseThrow();
        MedicalRecord record = new MedicalRecord();
        record.setAppointment(appointment);
        record.setPatient(patient);
        record.setDoctor(doctor);
        record.setDiagnosis(request.getDiagnosis());
        record.setTreatment(request.getTreatment());
        record.setNotesEncrypted(EncryptionUtil.encrypt(
            request.getNotes()
        ));
        medicalRecordRepository.save(record);
        auditService.log(
        "CREATE_MEDICAL_RECORD",
        "/api/medical-record",
        "SYSTEM",
        "HIGH"
        );
        return MedicalRecordResponse
                .builder()
                .recordId(
                        record.getRecordId()
                )
                .patientName(
                        patient.getUser()
                                .getFullname()
                )
                .doctorName(
                        doctor.getUser()
                                .getFullname()
                )
                .diagnosis(
                        record.getDiagnosis()
                )
                .treatment(
                        record.getTreatment()
                )
                .build();
    }
}