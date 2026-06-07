import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Search, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { getAppointments, getPatients, getDoctors, createAppointment, cancelAppointment } from '../utils/api';
import { useToast } from '../components/ui/Toast';
import { useAuth } from '../context/AuthContext';

export default function Appointments() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showBookModal, setShowBookModal] = useState(false);
  const [form, setForm] = useState({ patientId: '', doctorId: '', date: '', time: '', notes: '' });

  useEffect(() => {
    fetchAll();
  }, []);

  async function fetchAll() {
    try {
      setLoading(true);
      const [appts, pats, docs] = await Promise.all([
        getAppointments(),
        getPatients(),
        getDoctors(),
      ]);
      setAppointments(appts);
      setPatients(pats);
      setDoctors(docs);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleBook() {
    try {
      await createAppointment(form);
      await fetchAll();
      showToast('success', 'Janji temu berhasil dibuat');
      setShowBookModal(false);
      setForm({ patientId: '', doctorId: '', date: '', time: '', notes: '' });
    } catch (e: any) {
      showToast('error', e.message || 'Gagal membuat janji temu');
    }
  }

  async function handleCancel(id: string) {
    try {
      await cancelAppointment(id);
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' } : a));
      showToast('success', 'Janji temu dibatalkan');
    } catch (e: any) {
      showToast('error', e.message);
    }
  }

  function getPatientName(patientId: string) {
    return patients.find(p => p.id === patientId)?.name || patientId;
  }

  function getDoctorName(doctorId: string) {
    return doctors.find(d => d.id === doctorId)?.name || doctorId;
  }

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      getPatientName(apt.patientId).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDoctorName(apt.doctorId).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger' | 'info'> = {
      scheduled: 'info', completed: 'success', cancelled: 'danger', 'no-show': 'warning',
    };
    const labels: Record<string, string> = {
      scheduled: 'Dijadwalkan', completed: 'Selesai', cancelled: 'Dibatalkan', 'no-show': 'Tidak Hadir',
    };
    return <Badge variant={variants[status]}>{labels[status] ?? status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Janji Temu</h1>
          <p className="text-gray-500 mt-1">Kelola janji temu pasien</p>
        </div>
        <Button icon={<Plus className="w-4 h-4" />} onClick={() => setShowBookModal(true)}>
          Tambah Janji Temu
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
                placeholder="Cari nama pasien atau dokter..."
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
              <option value="scheduled">Dijadwalkan</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-medical-600" />
            <span className="font-semibold text-gray-900">
              {loading ? 'Memuat...' : `${filteredAppointments.length} Janji Temu`}
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-0">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Memuat data...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Pasien</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Dokter</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Waktu</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Catatan</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-medical-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-medical-600" />
                          </div>
                          <span className="font-medium text-gray-900">{getPatientName(apt.patientId)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{getDoctorName(apt.doctorId)}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />{apt.date}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />{apt.time}
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(apt.status)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{apt.notes || '-'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {apt.status === 'scheduled' && (
                            <Button variant="ghost" size="sm" onClick={() => handleCancel(apt.id)}>
                              Batalkan
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredAppointments.length === 0 && !loading && (
                <div className="p-8 text-center text-gray-500">Tidak ada janji temu</div>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      <Modal isOpen={showBookModal} onClose={() => setShowBookModal(false)} title="Tambah Janji Temu Baru" size="lg">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="label">Pilih Pasien</label>
              <select className="input" value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })}>
                <option value="">Pilih pasien</option>
                {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="label">Pilih Dokter</label>
              <select className="input" value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
                <option value="">Pilih dokter</option>
                {doctors.map(d => <option key={d.id} value={d.id}>{d.name} - {d.specialization}</option>)}
              </select>
            </div>
            <Input label="Tanggal" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <Input label="Waktu" type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            <div className="col-span-2">
              <label className="label">Keluhan / Catatan</label>
              <textarea
                className="input min-h-[80px] resize-none"
                placeholder="Jelaskan keluhan atau catatan tambahan"
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="button" className="flex-1" onClick={handleBook}>Simpan</Button>
            <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowBookModal(false)}>Batal</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
