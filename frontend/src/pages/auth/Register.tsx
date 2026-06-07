import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';
import { UserRole } from '../../types';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    const nameResult = validateName(name);
    if (!nameResult.isValid) newErrors.name = nameResult.error || '';

    const emailResult = validateEmail(email);
    if (!emailResult.isValid) newErrors.email = emailResult.error || '';

    const passwordResult = validatePassword(password);
    if (!passwordResult.isValid) newErrors.password = passwordResult.error || '';

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.password && !newErrors.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await register(name, email, password, role);

    if (result.success) {
      showToast('success', 'Registrasi berhasil!');
      navigate('/dashboard');
    } else {
      showToast('error', result.error || 'Registrasi gagal');
    }

    setIsLoading(false);
  };

  const roleOptions = [
    { value: 'patient', label: 'Pasien', description: 'Dapat booking dokter dan lihat riwayat medis' },
    { value: 'doctor', label: 'Dokter', description: 'Dapat melihat pasien dan riwayat medis' },
    { value: 'pharmacist', label: 'Apoteker', description: 'Dapat mengelola resep obat' },
    { value: 'admin', label: 'Admin', description: 'Akses penuh ke sistem' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-600 via-medical-700 to-medical-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Daftar Akun Baru</h1>
          <p className="text-medical-200 mt-2">Buat akun untuk mengakses sistem</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Nama Lengkap"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              icon={<User className="w-5 h-5" />}
              disabled={isLoading}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              icon={<Mail className="w-5 h-5" />}
              disabled={isLoading}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimal 8 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              icon={<Lock className="w-5 h-5" />}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              disabled={isLoading}
            />

            <Input
              label="Konfirmasi Password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Masukkan ulang password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              icon={<Lock className="w-5 h-5" />}
              suffix={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              }
              disabled={isLoading}
            />

            <div>
              <label className="label">Daftar Sebagai</label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value as UserRole)}
                    disabled={isLoading}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      role === option.value
                        ? 'border-medical-500 bg-medical-50 ring-2 ring-medical-500/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-900">{option.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Daftar
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-medical-600 hover:text-medical-700 font-medium">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-medical-200 text-sm mt-6">
          <Link to="/" className="hover:text-white">
            Kembali ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
