import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { validateEmail, validatePassword, validateRequired } from '../../utils/validation';
import { useToast } from '../../components/ui/Toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };

    const emailResult = validateEmail(email);
    if (!emailResult.isValid) newErrors.email = emailResult.error || '';

    const passwordResult = validatePassword(password);
    if (!passwordResult.isValid) newErrors.password = passwordResult.error || '';

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const result = await login(email, password, rememberMe);

    if (result.success) {
      showToast('success', 'Login berhasil!');
      navigate('/dashboard');
    } else {
      showToast('error', result.error || 'Login gagal');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-600 via-medical-700 to-medical-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Sistem Keamanan Rumah Sakit</h1>
          <p className="text-medical-200 mt-2">Silakan masuk untuk melanjutkan</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              placeholder="Masukkan password Anda"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-medical-600 focus:ring-medical-500"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-600">Ingat saya</span>
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-medical-600 hover:text-medical-700 font-medium"
              >
                Lupa password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
              Masuk
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-medical-600 hover:text-medical-700 font-medium">
                Daftar sekarang
              </Link>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Akun:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setEmail('admin@hospital.com');
                  setPassword('admin123');
                }}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('doctor@hospital.com');
                  setPassword('doctor123');
                }}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
              >
                Dokter
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('patient@email.com');
                  setPassword('patient123');
                }}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
              >
                Pasien
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail('pharmacist@hospital.com');
                  setPassword('pharma123');
                }}
                className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 text-gray-600"
              >
                Apoteker
              </button>
            </div>
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
