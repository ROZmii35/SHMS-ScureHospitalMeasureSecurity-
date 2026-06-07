import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Shield, Edit, Camera } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const roleLabels: Record<string, string> = {
    admin: 'Administrator',
    doctor: 'Dokter',
    patient: 'Pasien',
    pharmacist: 'Apoteker',
  };

  const handleSave = () => {
    updateProfile(formData);
    showToast('success', 'Profil berhasil diperbarui');
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profil Saya</h1>
          <p className="text-gray-500 mt-1">Kelola informasi profil Anda</p>
        </div>
        {!isEditing && (
          <Button icon={<Edit className="w-4 h-4" />} onClick={() => setIsEditing(true)}>
            Edit Profil
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardBody className="text-center py-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-medical-100 rounded-full flex items-center justify-center mx-auto">
                <User className="w-12 h-12 text-medical-600" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-medical-600 rounded-full flex items-center justify-center text-white hover:bg-medical-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-4">
              <Badge variant="info">{roleLabels[user?.role || '']}</Badge>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Verified Account</span>
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Informasi Pribadi</h2>
            </CardHeader>
            <CardBody>
              {isEditing ? (
                <form className="space-y-4">
                  <Input
                    label="Nama Lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    icon={<User className="w-5 h-5" />}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    icon={<Mail className="w-5 h-5" />}
                    disabled
                  />
                  <Input
                    label="Nomor Telepon"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    icon={<Phone className="w-5 h-5" />}
                  />
                  <Input
                    label="Alamat"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    icon={<MapPin className="w-5 h-5" />}
                  />
                  <div className="flex gap-3 pt-4">
                    <Button type="button" onClick={handleSave}>
                      Simpan
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                      Batal
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Nama Lengkap</p>
                      <p className="font-medium text-gray-900">{user?.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Nomor Telepon</p>
                      <p className="font-medium text-gray-900">{user?.phone || 'Belum diisi'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Alamat</p>
                      <p className="font-medium text-gray-900">{user?.address || 'Belum diisi'}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Keamanan Akun</h2>
        </CardHeader>
        <CardBody>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-500">Terakhir diubah 30 hari yang lalu</p>
            </div>
            <Button variant="secondary" size="sm">Ubah Password</Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mt-3">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">Lapisan keamanan tambahan untuk akun Anda</p>
            </div>
            <Badge variant="warning">Nonaktif</Badge>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
