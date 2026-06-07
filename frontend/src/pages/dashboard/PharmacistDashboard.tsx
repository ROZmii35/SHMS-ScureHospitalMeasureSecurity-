import { useState, useEffect } from 'react';
import { Pill, Clock, CheckCircle, FileText, Button as _B } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { getPrescriptions, getPatients, getDoctors, dispensePrescription } from '../../utils/api';
import { useToast } from '../../components/ui/Toast';

export default function PharmacistDashboard() {
  const { showToast } = useToast();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [prescs, pats, docs] = await Promise.all([
          getPrescriptions(),
          getPatients(),
          getDoctors(),
        ]);
        setPrescriptions(prescs);
        setPatients(pats);
        setDoctors(docs);
      } catch {
        // silent fail
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const pendingPrescriptions = prescriptions.filter(p => p.status === 'pending');
  const dispensedToday = prescriptions.filter(p => p.status === 'dispensed');

  const getPatientName = (patientId: string) => patients.find(p => p.id === patientId)?.name || patientId;
  const getDoctorName = (doctorId: string) => doctors.find(d => d.id === doctorId)?.name || doctorId;

  async function handleDispense(id: string) {
    try {
      await dispensePrescription(id);
      setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'dispensed', dispensedAt: new Date().toISOString() } : p));
      showToast('success', 'Resep berhasil diterbitkan');
    } catch (e: any) {
      showToast('error', e.message);
    }
  }

  const stats = [
    { label: 'Resep Menunggu', value: pendingPrescriptions.length, icon: <Clock className="w-5 h-5" />, color: 'warning' },
    { label: 'Diterbitkan', value: dispensedToday.length, icon: <CheckCircle className="w-5 h-5" />, color: 'success' },
    { label: 'Total Resep', value: prescriptions.length, icon: <Pill className="w-5 h-5" />, color: 'medical' },
    { label: 'Obat Tersedia', value: '-', icon: <FileText className="w-5 h-5" />, color: 'info' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Apoteker</h1>
          <p className="text-gray-500 mt-1">Kelola resep dan inventaris obat</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-warning-100 text-warning-600 rounded-lg text-sm font-medium">
          <Clock className="w-4 h-4" />{pendingPrescriptions.length} Resep Menunggu
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Memuat data...</div>
      ) : (
        <>
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
                            <Badge variant="info">ID: {presc.id?.toUpperCase()}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">Dokter: {getDoctorName(presc.doctorId)}</p>
                        </div>
                        <Button size="sm" onClick={() => handleDispense(presc.id)}>Terbitkan</Button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Daftar Obat:</p>
                        <div className="space-y-2">
                          {(presc.medications ?? []).map((med: any) => (
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
                {dispensedToday.length === 0 ? (
                  <div className="p-6 text-center text-gray-500 text-sm">Belum ada resep diterbitkan</div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {dispensedToday.map((presc) => (
                      <div key={presc.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900">{getPatientName(presc.patientId)}</p>
                            <p className="text-sm text-gray-500">{presc.medications?.length ?? 0} obat</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="success">Selesai</Badge>
                            {presc.dispensedAt && (
                              <p className="text-xs text-gray-400 mt-1">
                                {new Date(presc.dispensedAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </p>
                            )}
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
                <h2 className="font-semibold text-gray-900">Stok Obat Rendah</h2>
              </CardHeader>
              <CardBody>
                <div className="p-4 text-center text-gray-500 text-sm">
                  Data stok obat akan ditampilkan dari sistem inventaris.
                </div>
              </CardBody>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
