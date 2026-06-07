import { useState, useEffect } from 'react';
import { FileText, Search, Eye, Plus, User, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { getMedicalRecords, getPatients, getDoctors } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function MedicalRecords() {
  const { user } = useAuth();
  const [records, setRecords] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);

  const isAdminOrDoctor = user?.role === 'admin' || user?.role === 'doctor';

  useEffect(() => {
    async function fetchAll() {
      try {
        setLoading(true);
        const [recs, pats, docs] = await Promise.all([
          getMedicalRecords(),
          getPatients(),
          getDoctors(),
        ]);
        setRecords(recs);
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

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const filteredRecords = records.filter(record =>
    getPatientName(record.patientId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Medis</h1>
          <p className="text-gray-500 mt-1">Rekam medis pasien</p>
        </div>
        {isAdminOrDoctor && (
          <Button icon={<Plus className="w-4 h-4" />}>Tambah Rekam Medis</Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}

      <Card>
        <CardBody>
          <Input
            placeholder="Cari nama pasien atau diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-5 h-5" />}
          />
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-medical-600" />
            <span className="font-semibold text-gray-900">
              {loading ? 'Memuat...' : `${filteredRecords.length} Rekam Medis`}
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat data rekam medis...</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => { setSelectedRecord(record); setShowDetailModal(true); }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-medical-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{getPatientName(record.patientId)}</p>
                        <p className="text-sm text-gray-500 mt-1">Diagnosis: {record.diagnosis}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />{getDoctorName(record.doctorId)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />{formatDate(record.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>Detail</Button>
                  </div>
                </div>
              ))}
              {filteredRecords.length === 0 && !loading && (
                <div className="p-8 text-center text-gray-500">Tidak ada rekam medis</div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Detail Rekam Medis" size="lg">
        {selectedRecord && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Pasien</p>
                <p className="font-medium">{getPatientName(selectedRecord.patientId)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dokter</p>
                <p className="font-medium">{getDoctorName(selectedRecord.doctorId)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tanggal</p>
                <p className="font-medium">{formatDate(selectedRecord.createdAt)}</p>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Diagnosis</h4>
              <p className="text-gray-600">{selectedRecord.diagnosis}</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Resep</h4>
              <p className="text-gray-600">{selectedRecord.prescription}</p>
            </div>
            {selectedRecord.notes && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Catatan</h4>
                <p className="text-gray-600">{selectedRecord.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
