import { Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Activity,
  Users,
  FileText,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
} from 'lucide-react';
import Button from '../../components/ui/Button';

const features = [
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Akses Terkontrol',
    description: 'Role-based access control untuk membatasi akses sesuai kewenangan',
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: 'Monitoring Real-time',
    description: 'Pemantauan aktivitas sistem secara real-time dengan audit log lengkap',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Multi-Role System',
    description: 'Mendukung admin, dokter, pasien, dan apoteker dengan dashboard berbeda',
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: 'Rekam Medis Digital',
    description: 'Penyimpanan dan akses rekam medis secara digital yang aman',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Janji Temu Online',
    description: 'Sistem booking online untuk janji temu dengan dokter',
  },
];

const stats = [
  { value: '50,000+', label: 'Pasien Aktif' },
  { value: '200+', label: 'Dokter Spesialis' },
  { value: '99.9%', label: 'Uptime Sistem' },
  { value: '24/7', label: 'Support' },
];

const testimonials = [
  {
    name: 'Dr. Sari Pratiwi',
    role: 'Kardiolog',
    content: 'Sistem yang sangat membantu dalam mengelola pasien. Interface intuitif dan keamanan data terjamin.',
  },
  {
    name: 'Budi Santoso',
    role: 'Pasien',
    content: 'Booking dokter jadi mudah dan saya bisa lihat riwayat medis kapan saja. Sangat praktis!',
  },
  {
    name: 'Rina Kusuma',
    role: 'Apoteker',
    content: 'Mengelola resep jadi lebih efisien. Tidak ada lagi kesalahan dispensing obat.',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">RS Medika Utama</span>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">
                Fitur
              </a>
              <a href="#stats" className="text-sm text-gray-600 hover:text-gray-900">
                Statistik
              </a>
              <a href="#testimonials" className="text-sm text-gray-600 hover:text-gray-900">
                Testimonial
              </a>
              <Link to="/about" className="text-sm text-gray-600 hover:text-gray-900">
                Tentang
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-20 bg-gradient-to-b from-medical-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Kelola Data Kesehatan
              <br />
              <span className="text-medical-600">dengan Aman</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Sistem manajemen rumah sakit yang terintegrasi untuk pelayanan pasien yang lebih cepat, mudah, dan efisien.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                  Mulai Sekarang
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="secondary" size="lg">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="bg-gradient-to-br from-medical-600 to-medical-800 rounded-2xl shadow-2xl p-8 text-white">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: <Users />, label: 'Pasien', value: '156' },
                  { icon: <Activity />, label: 'Aktivitas', value: '1,234' },
                  { icon: <FileText />, label: 'Rekaman', value: '89' },
                  { icon: <Shield />, label: 'Keamanan', value: '100%' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-medical-200">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Fitur Keamanan Utama</h2>
            <p className="mt-4 text-gray-600">
              Dirancang untuk memenuhi standar keamanan data kesehatan terbaik
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-xl hover:bg-medical-50 transition-colors"
              >
                <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center text-medical-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stats" className="py-20 bg-medical-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-medical-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Apa Kata Mereka</h2>
            <p className="mt-4 text-gray-600">Testimoni dari pengguna sistem kami</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-1 text-warning-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-medical-600 to-medical-800 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Siap Meningkatkan Keamanan Data?</h2>
            <p className="text-medical-200 mb-8 max-w-2xl mx-auto">
              Bergabung dengan ratusan rumah sakit yang telah mempercayakan keamanan data mereka
              kepada RS Medika Utama.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Daftar Gratis
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10 border border-white/30"
                >
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">RS Medika Utama</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sistem Keamanan Rumah Sakit Digital dengan standar keamanan tinggi.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produk</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Fitur</a></li>
                <li><a href="#" className="hover:text-white">Harga</a></li>
                <li><a href="#" className="hover:text-white">Integrasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-white">Karir</a></li>
                <li><a href="#" className="hover:text-white">Kontak</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 RS Medika Utama. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
