import { useState } from 'react';
import { FileText, Search, Filter, Eye, Plus, User, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { dummyMedicalRecords, dummyPatients, dummyDoctors } from '../data/dummy';
import { useAuth } from '../context/AuthContext';

export default function MedicalRecords() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<typeof dummyMedicalRecords[0] | null>(null);

  const isAdminOrDoctor = user?.role === 'admin' || user?.role === 'doctor';

  const filteredRecords = dummyMedicalRecords.filter(record =>
    getPatientName(record.patientId).toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.diagnosis.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function getPatientName(patientId: string) {
    return dummyPatients.find(p => p.id === patientId)?.name || 'Unknown';
  }

  function getDoctorName(doctorId: string) {
    return dummyDoctors.find(d => d.id === doctorId)?.name || 'Unknown';
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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

      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari nama pasien atau diagnosis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-medical-600" />
            <span className="font-semibold text-gray-900">
              {filteredRecords.length} Rekam Medis
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="px-6 py-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  setSelectedRecord(record);
                  setShowDetailModal(true);
                }}
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
                          <User className="w-4 h-4" />
                          {getDoctorName(record.doctorId)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(record.createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon={<Eye className="w-4 h-4" />}>
                    Detail
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Detail Rekam Medis"
        size="lg"
      >
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

            {selectedRecord.attachments.length > 0 && (
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Lampiran</h4>
                <div className="space-y-2">
                  {selectedRecord.attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-2 text-sm text-gray-600">
                      <FileText className="w-4 h-4" />
                      {att.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
