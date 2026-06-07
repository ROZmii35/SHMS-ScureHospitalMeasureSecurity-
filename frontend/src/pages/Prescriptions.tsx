import { useState, useEffect } from 'react';
import { Pill, Search, CheckCircle, X, Eye } from 'lucide-react';
import { Card, CardBody } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { getPrescriptions, getPatients, getDoctors, dispensePrescription, cancelPrescription } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Prescriptions() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<any | null>(null);

  const isPharmacist = user?.role === 'pharmacist';

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [prescs, pats, docs] = await Promise.all([
          getPrescriptions(),
          getPatients(),
          getDoctors(),
        ]);
        setPrescriptions(prescs);
        setPatients(pats);
        setDoctors(docs);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  function getPatientName(patientId: string) {
    return patients.find(p => p.id === patientId)?.name || patientId;
  }

  function getDoctorName(doctorId: string) {
    return doctors.find(d => d.id === doctorId)?.name || doctorId;
  }

  async function handleDispense(id: string) {
    try {
      await dispensePrescription(id);
      setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'dispensed' } : p));
      showToast('success', 'Resep berhasil diterbitkan');
      setShowDetailModal(false);
    } catch (e: any) {
      showToast('error', e.message);
    }
  }

  async function handleCancel(id: string) {
    try {
      await cancelPrescription(id);
      setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: 'cancelled' } : p));
      showToast('success', 'Resep dibatalkan');
      setShowDetailModal(false);
    } catch (e: any) {
      showToast('error', e.message);
    }
  }

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = getPatientName(p.patientId).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { variant: 'warning' | 'success' | 'danger'; label: string }> = {
      pending: { variant: 'warning', label: 'Menunggu' },
      dispensed: { variant: 'success', label: 'Diterbitkan' },
      cancelled: { variant: 'danger', label: 'Dibatalkan' },
    };
    const s = map[status] ?? { variant: 'info' as any, label: status };
    return <Badge variant={s.variant}>{s.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Resep</h1>
          <p className="text-gray-500 mt-1">
            {isPharmacist ? 'Terbitkan resep obat pasien' : 'Daftar resep obat'}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}

      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama pasien..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-medical-500"
            >
              <option value="all">Semua Status</option>
              <option value="pending">Menunggu</option>
              <option value="dispensed">Diterbitkan</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </CardBody>
      </Card>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Memuat data resep...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPrescriptions.map((presc) => (
            <Card key={presc.id} hover>
              <CardBody>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{getPatientName(presc.patientId)}</p>
                    <p className="text-sm text-gray-500">{presc.id?.toUpperCase()}</p>
                  </div>
                  {statusBadge(presc.status)}
                </div>

                <div className="space-y-2 mb-4">
                  {(presc.medications ?? []).slice(0, 2).map((med: any) => (
                    <div key={med.id} className="flex items-center gap-2 text-sm">
                      <Pill className="w-4 h-4 text-medical-600" />
                      <span className="text-gray-700">{med.name}</span>
                      <span className="text-gray-400">{med.dosage}</span>
                    </div>
                  ))}
                  {(presc.medications?.length ?? 0) > 2 && (
                    <p className="text-sm text-gray-500">+{presc.medications.length - 2} obat lainnya</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                  <span>{getDoctorName(presc.doctorId)}</span>
                  <span>{new Date(presc.createdAt).toLocaleDateString('id-ID')}</span>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    variant="ghost" size="sm" className="flex-1"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => { setSelectedPrescription(presc); setShowDetailModal(true); }}
                  >
                    Detail
                  </Button>
                  {isPharmacist && presc.status === 'pending' && (
                    <Button
                      size="sm" className="flex-1"
                      icon={<CheckCircle className="w-4 h-4" />}
                      onClick={() => handleDispense(presc.id)}
                    >
                      Terbitkan
                    </Button>
                  )}
                </div>
              </CardBody>
            </Card>
          ))}
          {filteredPrescriptions.length === 0 && (
            <div className="col-span-3 p-8 text-center text-gray-500">Tidak ada resep</div>
          )}
        </div>
      )}

      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Resep" size="lg">
        {selectedPrescription && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div><p className="text-sm text-gray-500">Pasien</p><p className="font-medium">{getPatientName(selectedPrescription.patientId)}</p></div>
              <div><p className="text-sm text-gray-500">Dokter</p><p className="font-medium">{getDoctorName(selectedPrescription.doctorId)}</p></div>
              <div><p className="text-sm text-gray-500">Tanggal</p><p className="font-medium">{new Date(selectedPrescription.createdAt).toLocaleDateString('id-ID')}</p></div>
              <div><p className="text-sm text-gray-500">Status</p>{statusBadge(selectedPrescription.status)}</div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Daftar Obat</h4>
              <div className="space-y-3">
                {(selectedPrescription.medications ?? []).map((med: any) => (
                  <div key={med.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage}</p>
                      </div>
                      <Badge variant="info">{med.frequency}</Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>Durasi: {med.duration}</span>
                      {med.notes && <span>Catatan: {med.notes}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isPharmacist && selectedPrescription.status === 'pending' && (
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1" icon={<CheckCircle className="w-4 h-4" />}
                  onClick={() => handleDispense(selectedPrescription.id)}>
                  Terbitkan Resep
                </Button>
                <Button variant="secondary" className="flex-1" icon={<X className="w-4 h-4" />}
                  onClick={() => handleCancel(selectedPrescription.id)}>
                  Tolak
                </Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
