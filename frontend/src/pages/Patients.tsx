import { useState, useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, User, Filter } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { getPatients, createPatient, deletePatient } from '../utils/api';
import { Patient } from '../types';

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dateOfBirth: '',
    gender: 'male', bloodType: '', address: '', emergencyContact: '',
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    try {
      setLoading(true);
      const data = await getPatients();
      setPatients(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPatient() {
    try {
      await createPatient(form);
      await fetchPatients();
      setShowAddModal(false);
      setForm({ name: '', email: '', phone: '', dateOfBirth: '', gender: 'male', bloodType: '', address: '', emergencyContact: '' });
    } catch (e: any) {
      setError(e.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Hapus data pasien ini?')) return;
    try {
      await deletePatient(id);
      setPatients(prev => prev.filter(p => p.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birth = new Date(dob);
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() - birth.getMonth() < 0 ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return age;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Pasien</h1>
          <p className="text-gray-500 mt-1">Kelola data pasien rumah sakit</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          Tambah Pasien
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}

      <Card>
        <CardBody>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Cari berdasarkan nama atau email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                icon={<Search className="w-5 h-5" />}
              />
            </div>
            <Button variant="secondary" icon={<Filter className="w-4 h-4" />}>Filter</Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-medical-600" />
            <span className="font-semibold text-gray-900">
              {loading ? 'Memuat...' : `${filteredPatients.length} Pasien`}
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat data pasien...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Telepon</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Umur</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Gol. Darah</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jenis Kelamin</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-medical-600" />
                          </div>
                          <span className="font-medium text-gray-900">{patient.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{patient.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{patient.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {patient.dateOfBirth ? `${calculateAge(patient.dateOfBirth)} tahun` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        {patient.bloodType && <Badge variant="info">{patient.bloodType}</Badge>}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {patient.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost" size="sm"
                            icon={<Eye className="w-4 h-4" />}
                            onClick={() => { setSelectedPatient(patient); setShowViewModal(true); }}
                          />
                          <Button variant="ghost" size="sm" icon={<Edit className="w-4 h-4" />} />
                          <Button
                            variant="ghost" size="sm"
                            icon={<Trash2 className="w-4 h-4 text-danger-500" />}
                            onClick={() => handleDelete(patient.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPatients.length === 0 && !loading && (
                <div className="p-8 text-center text-gray-500">Tidak ada data pasien</div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* View Modal */}
      <Modal isOpen={showViewModal} onClose={() => setShowViewModal(false)} title="Detail Pasien" size="lg">
        {selectedPatient && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b">
              <div className="w-16 h-16 bg-medical-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-medical-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{selectedPatient.name}</h3>
                <p className="text-gray-500">{selectedPatient.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Tanggal Lahir</p>
                <p className="font-medium">{selectedPatient.dateOfBirth ? formatDate(selectedPatient.dateOfBirth) : '-'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Jenis Kelamin</p>
                <p className="font-medium">{selectedPatient.gender === 'male' ? 'Laki-laki' : 'Perempuan'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telepon</p>
                <p className="font-medium">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Golongan Darah</p>
                <p className="font-medium">{selectedPatient.bloodType || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Alamat</p>
                <p className="font-medium">{selectedPatient.address || '-'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Kontak Darurat</p>
                <p className="font-medium">{selectedPatient.emergencyContact || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Tambah Pasien Baru" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Input label="Nama Lengkap" placeholder="Masukkan nama lengkap"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <Input label="Email" type="email" placeholder="email@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Input label="Telepon" placeholder="+62"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            <Input label="Tanggal Lahir" type="date"
              value={form.dateOfBirth} onChange={e => setForm({ ...form, dateOfBirth: e.target.value })} />
            <div>
              <label className="label">Jenis Kelamin</label>
              <select className="input" value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="label">Golongan Darah</label>
              <select className="input" value={form.bloodType} onChange={e => setForm({ ...form, bloodType: e.target.value })}>
                <option value="">Pilih</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bt => (
                  <option key={bt} value={bt}>{bt}</option>
                ))}
              </select>
            </div>
          </div>
          <Input label="Alamat" placeholder="Alamat lengkap"
            value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          <Input label="Kontak Darurat" placeholder="Nama dan nomor telepon"
            value={form.emergencyContact} onChange={e => setForm({ ...form, emergencyContact: e.target.value })} />
          <div className="flex gap-3 pt-4">
            <Button type="button" className="flex-1" onClick={handleAddPatient}>Simpan</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowAddModal(false)}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
