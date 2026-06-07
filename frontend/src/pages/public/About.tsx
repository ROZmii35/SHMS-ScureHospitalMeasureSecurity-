import { Link } from 'react-router-dom';
import { Shield, Lock, Users, Server, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const securityFeatures = [
  {
    title: 'Enkripsi Data',
    description: 'Semua data pasien dienkripsi menggunakan AES-256 baik saat simpan maupun transfer.',
  },
  {
    title: 'Two-Factor Authentication',
    description: 'Lapisan keamanan tambahan untuk akses sensitif dengan 2FA.',
  },
  {
    title: 'Audit Trail',
    description: 'Setiap aktivitas dicatat dengan timestamp, IP address, dan detail operasi.',
  },
  {
    title: 'Session Management',
    description: 'Timeout otomatis dan deteksi session mencurigakan.',
  },
  {
    title: 'Input Validation',
    description: 'Validasi ketat di frontend untuk mencegah XSS dan injection.',
  },
  {
    title: 'Secure File Upload',
    description: 'Restriksi tipe dan ukuran file dengan scanning malware.',
  },
];

const teamMembers = [
  {
    name: 'Tim Keamanan',
    role: 'Network & Security',
    description: 'Spesialis keamanan jaringan dengan pengalaman di bidang healthcare IT.',
  },
  {
    name: 'Tim Development',
    role: 'Software Engineering',
    description: 'Developer berpengalaman dalam membangun sistem healthcare yang aman.',
  },
  {
    name: 'Tim Compliance',
    role: 'Regulatory Affairs',
    description: 'Memastikan sistem memenuhi standar HIPAA dan regulasi kesehatan.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-medical-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-white">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Kembali</span>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white">RS Medika Utama</span>
            </div>
            <Link to="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10 border border-white/30"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="py-20 bg-medical-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold">Tentang RS Medika Utama</h1>
            <p className="mt-6 text-lg text-medical-200">
              Sistem Keamanan Rumah Sakit Digital dengan standar keamanan tinggi untuk
              melindungi data pasien dan memenuhi regulasi HIPAA.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Mengapa Keamanan Data Kesehatan Penting?
              </h2>
              <p className="text-gray-600 mb-4">
                Data kesehatan pasien adalah salah satu aset paling sensitif di era digital.
                Kebocoran data medis dapat menyebabkan dampak serius termasuk pencurian identitas,
                penipuan asuransi, dan pelanggaran privasi.
              </p>
              <p className="text-gray-600 mb-6">
                RS Medika Utama dibangun dengan pendekatan security-first, memastikan setiap komponen
                sistem dirancang untuk melindungi data pasien dari ancaman keamanan modern.
              </p>
              <div className="space-y-3">
                {[
                  'Memenuhi standar HIPAA',
                  'Enkripsi end-to-end',
                  'Role-based access control',
                  'Audit trail lengkap',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-success-500" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Lock className="w-10 h-10 text-medical-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">256-bit</p>
                <p className="text-sm text-gray-500">Enkripsi</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Server className="w-10 h-10 text-medical-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Users className="w-10 h-10 text-medical-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-500">User Roles</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 text-center">
                <Shield className="w-10 h-10 text-medical-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-500">HIPAA Ready</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Fitur Keamanan</h2>
            <p className="mt-4 text-gray-600">
              Teknologi keamanan terkini untuk melindungi data pasien
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="w-10 h-10 bg-medical-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5 text-medical-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Tim Kami</h2>
            <p className="mt-4 text-gray-600">
              Dedikasi untuk keamanan data kesehatan di Indonesia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-medical-600" />
                </div>
                <h3 className="font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-medical-600 mb-2">{member.role}</p>
                <p className="text-sm text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-medical-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Siap Membangun Sistem yang Lebih Aman?
          </h2>
          <p className="text-medical-200 mb-8 max-w-2xl mx-auto">
            Mulaigunakan RS Medika Utama untuk melindungi data pasien rumah sakit Anda
            dengan standar keamanan tinggi.
          </p>
          <Link to="/register">
            <Button variant="secondary" size="lg">
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 RS Medika Utama. Sistem Keamanan Rumah Sakit Digital.</p>
        </div>
      </footer>
    </div>
  );
}
