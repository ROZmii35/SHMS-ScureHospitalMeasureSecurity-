package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
    List<MedicalRecord> findByPatientPatientId(Long patientId);
    List<MedicalRecord>
    findByDoctorDoctorId(Long doctorId);
    boolean existsByAppointmentAppointmentId(
            Long appointmentId
    );
}
