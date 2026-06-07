import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plus } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { getDoctors, bookSchedule } from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Schedule() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ doctorId: string; day: string; time: string } | null>(null);
  const [notes, setNotes] = useState('');

  const isPatient = user?.role === 'patient';

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const data = await getDoctors();
        setDoctors(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  async function handleBook() {
    if (!selectedSlot) return;
    try {
      await bookSchedule({ ...selectedSlot, notes });
      showToast('success', 'Janji temu berhasil dibuat!');
      setShowBookModal(false);
      setSelectedSlot(null);
      setNotes('');
    } catch (e: any) {
      showToast('error', e.message || 'Gagal membuat janji temu');
    }
  }

  const currentDoctor = doctors.find(d => d.id === selectedDoctor);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jadwal Dokter</h1>
          <p className="text-gray-500 mt-1">
            {isPatient ? 'Pilih dokter dan waktu untuk booking' : 'Kelola jadwal praktek dokter'}
          </p>
        </div>
        {!isPatient && (
          <Button icon={<Plus className="w-4 h-4" />}>Tambah Jadwal</Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Pilih Dokter</h2>
            </CardHeader>
            <CardBody className="p-0">
              {loading ? (
                <div className="p-6 text-center text-gray-500">Memuat data dokter...</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {doctors.map((doctor) => (
                    <button
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor.id)}
                      className={`w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedDoctor === doctor.id ? 'bg-medical-50 border-l-4 border-medical-600' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-medical-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-medical-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{doctor.name}</p>
                          <p className="text-sm text-gray-500">{doctor.specialization}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                  {doctors.length === 0 && !loading && (
                    <div className="p-6 text-center text-gray-500">Tidak ada data dokter</div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">
                  {currentDoctor
                    ? `Jadwal - ${currentDoctor.name}`
                    : 'Pilih dokter untuk melihat jadwal'}
                </h2>
                {currentDoctor && (
                  <Badge variant="info">{currentDoctor.department}</Badge>
                )}
              </div>
            </CardHeader>
            <CardBody>
              {!selectedDoctor ? (
                <div className="text-center py-12 text-gray-500">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <p>Pilih dokter dari daftar di sebelah kiri</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(currentDoctor?.schedule ?? []).map((slot: any) => (
                    <div
                      key={slot.id}
                      className={`p-4 rounded-lg border ${
                        slot.bookedPatients >= slot.maxPatients
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-white border-gray-200 hover:border-medical-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-medical-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{slot.day}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{slot.startTime} - {slot.endTime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {slot.bookedPatients}/{slot.maxPatients} pasien
                            </span>
                            <Badge variant={slot.bookedPatients >= slot.maxPatients ? 'danger' : 'success'}>
                              {slot.bookedPatients >= slot.maxPatients ? 'Penuh' : 'Tersedia'}
                            </Badge>
                          </div>
                          {isPatient && slot.bookedPatients < slot.maxPatients && (
                            <Button
                              size="sm" className="mt-2"
                              onClick={() => {
                                setSelectedSlot({
                                  doctorId: selectedDoctor,
                                  day: slot.day,
                                  time: `${slot.startTime} - ${slot.endTime}`,
                                });
                                setShowBookModal(true);
                              }}
                            >
                              Booking
                            </Button>
                          )}
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              slot.bookedPatients >= slot.maxPatients ? 'bg-danger-500' : 'bg-medical-500'
                            }`}
                            style={{ width: `${(slot.bookedPatients / slot.maxPatients) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  {(currentDoctor?.schedule?.length ?? 0) === 0 && (
                    <div className="text-center py-8 text-gray-500">Tidak ada jadwal tersedia</div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <Modal isOpen={showBookModal} onClose={() => setShowBookModal(false)} title="Booking Janji Temu" size="md">
        {selectedSlot && (
          <div className="space-y-4">
            <div className="p-4 bg-medical-50 rounded-lg">
              <p className="text-sm text-gray-500">Dokter</p>
              <p className="font-medium text-gray-900">{doctors.find(d => d.id === selectedSlot.doctorId)?.name}</p>
              <p className="text-sm text-gray-500 mt-2">Waktu</p>
              <p className="font-medium text-gray-900">{selectedSlot.day}, {selectedSlot.time}</p>
            </div>
            <Input
              label="Keluhan / Catatan"
              placeholder="Jelaskan keluhan Anda"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
            <div className="flex gap-3">
              <Button className="flex-1" onClick={handleBook}>Konfirmasi Booking</Button>
              <Button variant="secondary" className="flex-1" onClick={() => setShowBookModal(false)}>Batal</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
