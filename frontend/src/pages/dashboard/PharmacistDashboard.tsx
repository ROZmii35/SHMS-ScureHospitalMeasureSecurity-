import { Pill, Clock, CheckCircle, AlertCircle, FileText, Users } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { dummyPrescriptions, dummyPatients, dummyDoctors } from '../../data/dummy';

export default function PharmacistDashboard() {
  const pendingPrescriptions = dummyPrescriptions.filter(p => p.status === 'pending');
  const dispensedToday = dummyPrescriptions.filter(p => p.status === 'dispensed');

  const stats = [
    { label: 'Resep Menunggu', value: pendingPrescriptions.length, icon: <Clock className="w-5 h-5" />, color: 'warning' },
    { label: 'Diterbitkan Hari Ini', value: dispensedToday.length, icon: <CheckCircle className="w-5 h-5" />, color: 'success' },
    { label: 'Total Resep', value: dummyPrescriptions.length, icon: <Pill className="w-5 h-5" />, color: 'medical' },
    { label: 'Obat Tersedia', value: 156, icon: <FileText className="w-5 h-5" />, color: 'info' },
  ];

  const getPatientName = (patientId: string) => {
    const patient = dummyPatients.find(p => p.id === patientId);
    return patient?.name || 'Unknown';
  };

  const getDoctorName = (doctorId: string) => {
    const doctor = dummyDoctors.find(d => d.id === doctorId);
    return doctor?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Apoteker</h1>
          <p className="text-gray-500 mt-1">Kelola resep dan inventaris obat</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-warning-100 text-warning-600 rounded-lg text-sm font-medium">
          <Clock className="w-4 h-4" />
          {pendingPrescriptions.length} Resep Menunggu
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardBody>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  stat.color === 'warning' ? 'bg-warning-100 text-warning-600' :
                  stat.color === 'success' ? 'bg-success-100 text-success-600' :
                  stat.color === 'medical' ? 'bg-medical-100 text-medical-600' :
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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Resep Menunggu Diterbitkan</h2>
            <Badge variant="warning">{pendingPrescriptions.length} Resep</Badge>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {pendingPrescriptions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <CheckCircle className="w-12 h-12 mx-auto text-success-300 mb-3" />
              <p>Semua resep telah diterbitkan</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {pendingPrescriptions.map((presc) => (
                <div key={presc.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{getPatientName(presc.patientId)}</p>
                        <Badge variant="info">ID: {presc.id.toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Dokter: {getDoctorName(presc.doctorId)}</p>
                    </div>
                    <Button size="sm">Terbitkan</Button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 mb-2 font-medium">Daftar Obat:</p>
                    <div className="space-y-2">
                      {presc.medications.map((med) => (
                        <div key={med.id} className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-medium text-gray-900">{med.name}</span>
                            <span className="text-gray-500 ml-2">{med.dosage}</span>
                          </div>
                          <span className="text-gray-500">{med.frequency}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Resep Terbaru Diterbitkan</h2>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {dispensedToday.map((presc) => (
                <div key={presc.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{getPatientName(presc.patientId)}</p>
                      <p className="text-sm text-gray-500">{presc.medications.length} obat</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="success">Selesai</Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(presc.dispensedAt || '').toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Stok Obat Rendah</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-3">
              {[
                { name: 'Paracetamol 500mg', stock: 12, min: 50 },
                { name: 'Amoxicillin 250mg', stock: 8, min: 30 },
                { name: 'Omeprazole 20mg', stock: 23, min: 40 },
              ].map((med, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-danger-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-danger-600">Stok: {med.stock} (min: {med.min})</p>
                  </div>
                  <Button size="sm" variant="danger">Pesan</Button>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
