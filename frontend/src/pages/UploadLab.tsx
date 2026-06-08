import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

export default function UploadLab() {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];
  const MAX_SIZE_MB = 2;

  function handleFileSelect(file: File) {
    setUploadStatus('idle');
    setErrorMsg('');
    if (!ALLOWED_TYPES.includes(file.type)) {
      setErrorMsg('Tipe file tidak diizinkan. Hanya PDF, PNG, JPG.');
      setUploadStatus('error');
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrorMsg(`Ukuran file maksimal ${MAX_SIZE_MB}MB.`);
      setUploadStatus('error');
      return;
    }
    setSelectedFile(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  async function handleUpload() {
    if (!selectedFile) return;
    const token = sessionStorage.getItem('authToken') ?? localStorage.getItem('authToken');
    if (!token) {
      setErrorMsg('Anda belum login.');
      setUploadStatus('error');
      return;
    }
    setUploading(true);
    setUploadStatus('idle');
    const formData = new FormData();
    formData.append(
      'metadata',
      new Blob(
        [JSON.stringify({ patientId: user?.id ?? '', category: 'LAB', description: 'Hasil Lab' })],
        { type: 'application/json' }
      )
    );
    formData.append('file', selectedFile);
    try {
      const res = await fetch('http://localhost/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: 'Upload gagal' }));
        throw new Error(data.error || 'Upload gagal');
      }
      setUploadStatus('success');
      setSelectedFile(null);
    } catch (e: unknown) {
      setErrorMsg((e as Error).message);
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Hasil Lab</h1>
        <p className="text-gray-500 mt-1">Unggah hasil pemeriksaan laboratorium Anda</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-medical-600" />
            <span className="font-semibold text-gray-900">Pilih File</span>
          </div>
        </CardHeader>
        <CardBody>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer
              ${dragOver ? 'border-medical-500 bg-medical-50' : 'border-gray-300 hover:border-medical-400 hover:bg-gray-50'}`}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 font-medium">Drag & drop file di sini, atau klik untuk pilih</p>
            <p className="text-sm text-gray-400 mt-2">Format: PDF, PNG, JPG — Maks {MAX_SIZE_MB}MB</p>
            <input
              id="file-input"
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={handleInputChange}
            />
          </div>

          {selectedFile && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-medical-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">{formatSize(selectedFile.size)}</p>
                </div>
              </div>
              <button
                onClick={() => { setSelectedFile(null); setUploadStatus('idle'); }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {uploadStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">File berhasil diupload!</p>
            </div>
          )}

          {uploadStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">{errorMsg}</p>
            </div>
          )}

          <div className="mt-6">
            <Button
              className="w-full"
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
            >
              {uploading ? 'Mengupload...' : 'Upload File'}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <span className="font-semibold text-gray-900">Ketentuan Upload</span>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              Format yang diterima: PDF, PNG, JPG/JPEG
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              Ukuran file maksimal {MAX_SIZE_MB}MB
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              File akan diverifikasi secara otomatis oleh sistem
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              Hasil lab dapat dilihat oleh dokter yang merawat Anda
            </li>
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}