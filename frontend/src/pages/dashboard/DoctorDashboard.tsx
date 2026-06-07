import { useState, useEffect } from 'react';
import { Users, Calendar, FileText, CheckCircle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { getAppointments, getPatients } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [appts, pats] = await Promise.all([getAppointments(), getPatients()]);
        setAppointments(appts);
        setPatients(pats);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const todayStr = new Date().toISOString().slice(0, 10);
  const todayAppointments = appointments.filter(a => a.date === todayStr && a.status === 'scheduled');
  const completedToday = appointments.filter(a => a.date === todayStr && a.status === 'completed');

  const getPatientName = (patientId: string) =>
    patients.find(p => p.id === patientId)?.name || patientId;

  const stats = [
    { label: 'Pasien Hari Ini', value: todayAppointments.length, icon: <Users className="w-5 h-5" />, color: 'medical' },
    { label: 'Selesai Diperiksa', value: completedToday.length, icon: <CheckCircle className="w-5 h-5" />, color: 'success' },
    { label: 'Jadwal Minggu Ini', value: appointments.filter(a => a.status === 'scheduled').length, icon: <Calendar className="w-5 h-5" />, color: 'warning' },
    { label: 'Total Pasien', value: patients.length, icon: <FileText className="w-5 h-5" />, color: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Dokter</h1>
          <p className="text-gray-500 mt-1">Selamat datang, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-success-100 text-success-600 rounded-lg text-sm font-medium">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />Online
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Memuat data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardBody>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === 'medical' ? 'bg-medical-100 text-medical-600' :
                      stat.color === 'success' ? 'bg-success-100 text-success-600' :
                      stat.color === 'warning' ? 'bg-warning-100 text-warning-600' :
                      'bg-medical-100 text-medical-700'
                    }`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Jadwal Pasien Hari Ini</h2>
                  <Badge variant="info">{todayAppointments.length} Janji Temu</Badge>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                {todayAppointments.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                    <p>Tidak ada janji temu hari ini</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {todayAppointments.map((apt, index) => (
                      <div key={apt.id} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center">
                            <span className="text-medical-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{getPatientName(apt.patientId)}</p>
                            <p className="text-sm text-gray-500">{apt.notes || 'Konsultasi umum'}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{apt.time}</p>
                            <p className="text-xs text-gray-500">{apt.date}</p>
                          </div>
                          <Button size="sm">Mulai</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Pasien Terbaru</h2>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-100">
                  {patients.slice(0, 5).map(patient => (
                    <div key={patient.id} className="px-4 py-3 hover:bg-gray-50">
                      <p className="font-medium text-gray-900 text-sm">{patient.name}</p>
                      <p className="text-xs text-gray-500">{patient.email}</p>
                    </div>
                  ))}
                  {patients.length === 0 && (
                    <div className="p-6 text-center text-gray-500 text-sm">Tidak ada data pasien</div>
                  )}
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Semua Janji Temu</h2>
                <a href="/appointments" className="text-sm text-medical-600 hover:text-medical-700">Lihat Semua</a>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pasien</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Waktu</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appointments.slice(0, 5).map(apt => (
                      <tr key={apt.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{getPatientName(apt.patientId)}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{apt.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{apt.time}</td>
                        <td className="px-6 py-4">
                          <Badge variant={apt.status === 'scheduled' ? 'info' : apt.status === 'completed' ? 'success' : 'danger'}>
                            {apt.status === 'scheduled' ? 'Dijadwalkan' : apt.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
