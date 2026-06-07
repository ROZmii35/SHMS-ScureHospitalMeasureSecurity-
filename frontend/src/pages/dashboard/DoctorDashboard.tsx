import { Users, Calendar, Clock, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { dummyPatients, dummyAppointments, dummyDoctors } from '../../data/dummy';
import { useAuth } from '../../context/AuthContext';

export default function DoctorDashboard() {
  const { user } = useAuth();

  const doctor = dummyDoctors.find(d => d.email.includes('doctor')) || dummyDoctors[0];
  const todayAppointments = dummyAppointments.filter(a => a.doctorId === doctor?.id && a.status === 'scheduled');
  const completedToday = dummyAppointments.filter(a => a.doctorId === doctor?.id && a.status === 'completed');

  const stats = [
    { label: 'Pasien Hari Ini', value: todayAppointments.length, icon: <Users className="w-5 h-5" />, color: 'medical' },
    { label: 'Selesai Diperiksa', value: completedToday.length, icon: <CheckCircle className="w-5 h-5" />, color: 'success' },
    { label: 'Jadwal Minggu Ini', value: doctor?.schedule.length || 0, icon: <Calendar className="w-5 h-5" />, color: 'warning' },
    { label: 'Total Pasien', value: dummyPatients.length, icon: <FileText className="w-5 h-5" />, color: 'info' },
  ];

  const formatTime = (time: string) => {
    return time;
  };

  const getPatientName = (patientId: string) => {
    const patient = dummyPatients.find(p => p.id === patientId);
    return patient?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Dokter</h1>
          <p className="text-gray-500 mt-1">Selamat datang, {user?.name}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-success-100 text-success-600 rounded-lg text-sm font-medium">
          <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse" />
          Online
        </div>
      </div>

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
                        <p className="text-sm font-medium text-gray-900">{formatTime(apt.time)}</p>
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
            <h2 className="font-semibold text-gray-900">Jadwal Praktek</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {doctor?.schedule.map((sched) => (
                <div key={sched.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{sched.day}</span>
                    <Badge variant={sched.bookedPatients >= sched.maxPatients ? 'danger' : 'success'}>
                      {sched.bookedPatients}/{sched.maxPatients}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {sched.startTime} - {sched.endTime}
                  </p>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-medical-500 rounded-full transition-all"
                      style={{ width: `${(sched.bookedPatients / sched.maxPatients) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Daftar Pasien Terbaru</h2>
            <a href="/patients" className="text-sm text-medical-600 hover:text-medical-700">
              Lihat Semua
            </a>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Telepon</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Gol. Darah</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dummyPatients.slice(0, 5).map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{patient.name}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{patient.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{patient.phone}</td>
                    <td className="px-6 py-4">
                      <Badge variant="info">{patient.bloodType}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button size="sm" variant="ghost">Lihat</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
