package com.shms.service;
import com.shms.dto.request.CreateDoctorRequest;
import com.shms.dto.response.DoctorResponse;
import com.shms.entity.Doctor;
import com.shms.entity.User;
import com.shms.repository.DoctorRepository;
import com.shms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final UserRepository userRepository;
    public DoctorResponse create(
            CreateDoctorRequest request){
        if(doctorRepository.existsByLicenseNumber(request.getLicenseNumber())){
            throw new RuntimeException("License already exists");
        }
        @SuppressWarnings("null")
        User user = userRepository.findById(request.getUserId()).orElseThrow();
        Doctor doctor = new Doctor();
        doctor.setUser(user);
        doctor.setSpecialization(request.getSpecialization());
        doctor.setLicenseNumber(request.getLicenseNumber());
        doctor.setScheduleInfo(request.getScheduleInfo());
        doctorRepository.save(doctor);
        return DoctorResponse.builder()
                .doctorId(
                        doctor.getDoctorId()
                )
                .fullname(
                        user.getFullname()
                )
                .specialization(
                        doctor.getSpecialization()
                )
                .licenseNumber(
                        doctor.getLicenseNumber()
                )
                .build();
    }
}