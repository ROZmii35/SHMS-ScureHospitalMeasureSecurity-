package com.shms.service;
import com.shms.dto.request.CreatePatientRequest;
import com.shms.dto.response.PatientResponse;
import com.shms.entity.Patient;
import com.shms.entity.User;
import com.shms.repository.PatientRepository;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PatientService {
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;
    public PatientResponse create(CreatePatientRequest request){
        if(patientRepository.existsByNik(request.getNik())){
            throw new RuntimeException("NIK already used");
        }
        @SuppressWarnings("null")
        User user = userRepository.findById(request.getUserId()).orElseThrow();
        Patient patient = new Patient();
        patient.setNik(request.getNik());
        patient.setBirthDate(request.getBirthDate());
        patient.setGender(request.getGender());
        patient.setBloodType(request.getBloodType());
        patient.setEmergencyContact(request.getEmergencyContact());
        patient.setUser(user);
        patientRepository.save(patient);
        return PatientResponse.builder()
                .patientId(
                        patient.getPatientId())
                .fullname(
                        user.getFullname())
                .nik(
                        patient.getNik())
                .bloodType(
                        patient.getBloodType())
                .gender(
                        patient.getGender())
                .build();
    }
}