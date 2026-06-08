// src/utils/api.ts

const BASE_URL = "http://localhost";

function getToken(): string | null {
    return sessionStorage.getItem("authToken");
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...((options.headers as Record<string, string>) ?? {}),
    };
    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP error ${res.status}`);
    }
    return res.json() as Promise<T>;
}

// ── Patients ──────────────────────────────────────────────────────────────────
export const getPatients = () => apiFetch<any[]>("/api/patients");
export const getPatientById = (id: string) => apiFetch<any>(`/api/patients/${id}`);
export const createPatient = (data: unknown) =>
    apiFetch<any>("/api/patients", { method: "POST", body: JSON.stringify(data) });
export const updatePatient = (id: string, data: unknown) =>
    apiFetch<any>(`/api/patients/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deletePatient = (id: string) =>
    apiFetch<void>(`/api/patients/${id}`, { method: "DELETE" });

// ── Doctors ───────────────────────────────────────────────────────────────────
export const getDoctors = () => apiFetch<any[]>("/api/doctors");
export const getDoctorById = (id: string) => apiFetch<any>(`/api/doctors/${id}`);
export const getDoctorSchedule = (id: string) => apiFetch<any[]>(`/api/doctors/${id}/schedule`);

// ── Appointments ──────────────────────────────────────────────────────────────
export const getAppointments = () => apiFetch<any[]>("/api/appointments");
export const getMyAppointments = () => apiFetch<any[]>("/api/appointments/my");
export const createAppointment = (data: unknown) =>
    apiFetch<any>("/api/appointments", { method: "POST", body: JSON.stringify(data) });
export const updateAppointment = (id: string, data: unknown) =>
    apiFetch<any>(`/api/appointments/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const cancelAppointment = (id: string) =>
    apiFetch<void>(`/api/appointments/${id}/cancel`, { method: "PUT" });

// ── Medical Records ───────────────────────────────────────────────────────────
export const getMedicalRecords = () => apiFetch<any[]>("/api/medical-records");
export const getMyMedicalRecords = () => apiFetch<any[]>("/api/medical-records/my");
export const createMedicalRecord = (data: unknown) =>
    apiFetch<any>("/api/medical-records", { method: "POST", body: JSON.stringify(data) });

// ── Prescriptions ─────────────────────────────────────────────────────────────
export const getPrescriptions = () => apiFetch<any[]>("/api/prescriptions");
export const getMyPrescriptions = () => apiFetch<any[]>("/api/prescriptions/my");
export const dispensePrescription = (id: string) =>
    apiFetch<any>(`/api/prescriptions/${id}/dispense`, { method: "PUT" });
export const cancelPrescription = (id: string) =>
    apiFetch<any>(`/api/prescriptions/${id}/cancel`, { method: "PUT" });

// ── Audit Logs ────────────────────────────────────────────────────────────────
export const getAuditLogs = () => apiFetch<any[]>("/api/audit-logs");

// ── Stats ──────────────────────────────────────────────────────────────────────
export const getSystemStats = () => apiFetch<any>("/api/stats");

// ── Schedules ─────────────────────────────────────────────────────────────────
export const getAllSchedules = () => apiFetch<any[]>("/api/schedules");
export const bookSchedule = (data: unknown) =>
    apiFetch<any>("/api/schedules/book", { method: "POST", body: JSON.stringify(data) });

// ── Profile ────────────────────────────────────────────────────────────────────
export const getMyProfile = () => apiFetch<any>("/api/users/me");
export const updateMyProfile = (data: unknown) =>
    apiFetch<any>("/api/users/me", { method: "PUT", body: JSON.stringify(data) });
