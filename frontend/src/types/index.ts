export type UserRole = 'admin' | 'doctor' | 'patient' | 'pharmacist';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  specialization?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female';
  bloodType: string;
  address: string;
  emergencyContact: string;
  medicalHistory: MedicalRecord[];
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  department: string;
  schedule: DoctorSchedule[];
  avatar?: string;
}

export interface DoctorSchedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  maxPatients: number;
  bookedPatients: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdAt: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription: string;
  notes?: string;
  attachments: Attachment[];
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'pdf' | 'image';
  size: number;
  url: string;
  uploadedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  medications: Medication[];
  status: 'pending' | 'dispensed' | 'cancelled';
  createdAt: string;
  dispensedAt?: string;
  dispensedBy?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  ipAddress: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export interface SystemStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  activePrescriptions: number;
  todayAppointments: number;
  pendingPrescriptions: number;
  systemUptime: string;
  lastBackup: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}
