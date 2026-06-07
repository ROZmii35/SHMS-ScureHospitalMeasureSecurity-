package com.shms.repository;
import org.springframework.stereotype.Repository;
import com.shms.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment>findByPatientPatientId(Long patientId);
    List<Appointment>findByDoctorDoctorId(Long doctorId);
    boolean existsByDoctorDoctorIdAndAppointmentDate(
            Long doctorId,
            java.time.LocalDateTime date
    );
}
