import { useState, useRef } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { validateFile, formatFileSize } from '../utils/validation';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

export default function UploadLab() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    Array.from(selectedFiles).forEach((file) => {
      const validation = validateFile(file);

      if (!validation.isValid) {
        showToast('error', validation.error || 'File tidak valid');
        return;
      }

      const newFile: UploadedFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        progress: 0,
        status: 'uploading',
      };

      setFiles((prev) => [...prev, newFile]);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === newFile.id ? { ...f, progress: 100, status: 'success' } : f
            )
          );
          showToast('success', `${file.name} berhasil diupload`);
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === newFile.id ? { ...f, progress: Math.min(progress, 99) } : f
            )
          );
        }
      }, 200);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return 'PDF';
    return 'IMG';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Upload Hasil Lab</h1>
          <p className="text-gray-500 mt-1">Upload file hasil laboratorium Anda</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Ketentuan Upload</h2>
        </CardHeader>
        <CardBody>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Format yang diizinkan</p>
              <p className="text-sm text-gray-500 mt-1">PDF, JPG, PNG</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Ukuran maksimal</p>
              <p className="text-sm text-gray-500 mt-1">2 MB per file</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">Catatan</p>
              <p className="text-sm text-gray-500 mt-1">Pastikan file tidak terinfeksi virus</p>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-medical-500 bg-medical-50'
                : 'border-gray-300 hover:border-medical-500'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files)}
            />
            <Upload className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drag & drop file di sini
            </p>
            <p className="text-sm text-gray-500 mb-4">
              atau klik untuk memilih file
            </p>
            <Button variant="secondary">Pilih File</Button>
          </div>
        </CardBody>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">File Terupload</h2>
              <Badge variant="info">{files.length} file</Badge>
            </div>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-100">
              {files.map((file) => (
                <div key={file.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${
                        file.type === 'application/pdf'
                          ? 'bg-danger-100 text-danger-600'
                          : 'bg-medical-100 text-medical-600'
                      }`}>
                        {getFileIcon(file.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {file.status === 'uploading' && (
                        <div className="text-sm text-gray-500">{Math.round(file.progress)}%</div>
                      )}
                      {file.status === 'success' && (
                        <CheckCircle className="w-5 h-5 text-success-500" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-5 h-5 text-danger-500" />
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4 text-danger-500" />}
                        onClick={() => removeFile(file.id)}
                      />
                    </div>
                  </div>
                  {file.status === 'uploading' && (
                    <div className="mt-3">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-medical-500 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-gray-900">Riwayat Upload</h2>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-gray-100">
            {[
              { name: 'Hasil_Lab_PCR_2024.pdf', date: '2024-06-10', type: 'pdf' },
              { name: 'X-Ray_Dada.jpg', date: '2024-06-05', type: 'image' },
              { name: 'Hasil_Darah_Complete.pdf', date: '2024-05-28', type: 'pdf' },
            ].map((file, i) => (
              <div key={i} className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                    file.type === 'pdf' ? 'bg-danger-100 text-danger-600' : 'bg-medical-100 text-medical-600'
                  }`}>
                    {file.type.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{file.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Selesai</Badge>
                  <Button variant="ghost" size="sm">Unduh</Button>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
