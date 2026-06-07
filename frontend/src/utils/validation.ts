export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return { isValid: false, error: 'Email tidak boleh kosong' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Format email tidak valid' };
  }

  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password tidak boleh kosong' };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password minimal 8 karakter' };
  }

  return { isValid: true };
}

export function validateName(name: string): ValidationResult {
  if (!name || name.trim() === '') {
    return { isValid: false, error: 'Nama tidak boleh kosong' };
  }

  if (name.trim().length < 3) {
    return { isValid: false, error: 'Nama minimal 3 karakter' };
  }

  return { isValid: true };
}

export function validatePhone(phone: string): ValidationResult {
  if (!phone || phone.trim() === '') {
    return { isValid: false, error: 'Nomor telepon tidak boleh kosong' };
  }

  const phoneRegex = /^[\d\s\-+()]+$/;
  if (!phoneRegex.test(phone)) {
    return { isValid: false, error: 'Format nomor telepon tidak valid' };
  }

  return { isValid: true };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return { isValid: false, error: `${fieldName} tidak boleh kosong` };
  }

  return { isValid: true };
}

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  file?: File;
}

const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export function validateFile(file: File): FileValidationResult {
  if (!file) {
    return { isValid: false, error: 'File tidak ditemukan' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Hanya file PDF, JPG, dan PNG yang diizinkan',
    };
  }

  if (file.size > MAX_SIZE_BYTES) {
    return {
      isValid: false,
      error: 'Ukuran file maksimal 2MB',
    };
  }

  return { isValid: true, file };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIcon(type: string): string {
  if (type === 'application/pdf') return 'pdf';
  if (type.startsWith('image/')) return 'image';
  return 'file';
}
