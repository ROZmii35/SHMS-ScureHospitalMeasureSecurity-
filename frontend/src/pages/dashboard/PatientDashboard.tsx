import { Calendar, Clock, FileText, Upload, Pill, Activity } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { dummyAppointments, dummyDoctors, dummyMedicalRecords, dummyPrescriptions } from '../../data/dummy';
import { useAuth } from '../../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();

  const appointments = dummyAppointments.slice(0, 4);
  const medicalRecords = dummyMedicalRecords.slice(0, 3);
  const prescriptions = dummyPrescriptions.filter(p => p.patientId === 'p1');

  const getDoctorName = (doctorId: string) => {
    const doctor = dummyDoctors.find(d => d.id === doctorId);
    return doctor?.name || 'Unknown Doctor';
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const stats = [
    { label: 'Janji Temu', value: appointments.length, icon: <Calendar className="w-5 h-5" /> },
    { label: 'Rekam Medis', value: medicalRecords.length, icon: <FileText className="w-5 h-5" /> },
    { label: 'Resep Aktif', value: prescriptions.filter(p => p.status === 'pending').length, icon: <Pill className="w-5 h-5" /> },
    { label: 'Hasil Lab', value: 2, icon: <Upload className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Pasien</h1>
          <p className="text-gray-500 mt-1">Selamat datang, {user?.name}</p>
        </div>
        <Button icon={<Calendar className="w-4 h-4" />}>Booking Dokter</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody className="text-center">
              <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center mx-auto mb-3 text-medical-600">
                {stat.icon}
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Janji Temu Mendatang</h2>
              <a href="/appointments" className="text-sm text-medical-600 hover:text-medical-700">
                Lihat Semua
              </a>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Belum ada janji temu</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {appointments.map((apt) => (
                  <div key={apt.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{getDoctorName(apt.doctorId)}</p>
                        <p className="text-sm text-gray-500 mt-1">{apt.notes}</p>
                      </div>
                      <Badge variant={apt.status === 'scheduled' ? 'info' : apt.status === 'completed' ? 'success' : 'warning'}>
                        {apt.status === 'scheduled' ? 'Dijadwalkan' : apt.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Resep Obat</h2>
              <a href="/prescriptions" className="text-sm text-medical-600 hover:text-medical-700">
                Lihat Semua
              </a>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            {prescriptions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Pill className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p>Belum ada resep</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {prescriptions.map((presc) => (
                  <div key={presc.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          {presc.medications.length} Obat Diresepkan
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Oleh {getDoctorName(presc.doctorId)}
                        </p>
                      </div>
                      <Badge variant={presc.status === 'pending' ? 'warning' : presc.status === 'dispensed' ? 'success' : 'danger'}>
                        {presc.status === 'pending' ? 'Menunggu' : presc.status === 'dispensed' ? 'Selesai' : 'Dibatalkan'}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {presc.medications.slice(0, 3).map((med) => (
                        <span key={med.id} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          {med.name}
                        </span>
                      ))}
                      {presc.medications.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                          +{presc.medications.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Riwayat Medis Terbaru</h2>
            <a href="/medical-records" className="text-sm text-medical-600 hover:text-medical-700">
              Lihat Semua
            </a>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {medicalRecords.map((record) => (
              <div key={record.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{record.diagnosis}</p>
                    <p className="text-sm text-gray-500 mt-1">{record.prescription}</p>
                    {record.notes && (
                      <p className="text-sm text-gray-400 mt-1">{record.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{formatDate(record.createdAt)}</p>
                    <p className="text-xs text-gray-400 mt-1">{getDoctorName(record.doctorId)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Upload Hasil Lab</h2>
        </CardHeader>
        <CardBody>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-medical-500 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">Drag & drop file hasil lab Anda di sini</p>
            <p className="text-sm text-gray-400 mb-4">Format: PDF, JPG, PNG (maks 2MB)</p>
            <Button variant="secondary" size="sm">Pilih File</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
