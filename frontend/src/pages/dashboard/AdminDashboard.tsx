import { useState, useEffect } from 'react';
import { Users, Activity, Shield, Clock, TrendingUp, AlertTriangle, Server } from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { getSystemStats, getAuditLogs } from '../../utils/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [s, logs] = await Promise.all([getSystemStats(), getAuditLogs()]);
        setStats(s);
        setAuditLogs(logs);
      } catch {
        // silently fail – show empty state
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'success'> = { high: 'danger', medium: 'warning', low: 'success' };
    return <Badge variant={variants[severity]}>{severity.toUpperCase()}</Badge>;
  };

  const criticalLogs = auditLogs.filter(log => log.severity === 'high');

  const statCards = stats ? [
    { label: 'Total Pasien', value: stats.totalPatients, icon: <Users className="w-5 h-5" />, change: '+12%' },
    { label: 'Total Dokter', value: stats.totalDoctors, icon: <Activity className="w-5 h-5" />, change: '+5%' },
    { label: 'Janji Temu Hari Ini', value: stats.todayAppointments, icon: <Clock className="w-5 h-5" />, change: '+8%' },
    { label: 'Resep Aktif', value: stats.activePrescriptions, icon: <Shield className="w-5 h-5" />, change: '+3%' },
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrator</h1>
          <p className="text-gray-500 mt-1">Pantau aktivitas sistem dan keamanan data</p>
        </div>
        {stats && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Server className="w-4 h-4" />Uptime: {stats.systemUptime}
          </div>
        )}
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-500">Memuat data dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statCards.map((stat, index) => (
              <Card key={index} hover>
                <CardBody>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value?.toLocaleString()}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-success-500" />
                        <span className="text-xs text-success-500 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-medical-100 rounded-lg flex items-center justify-center text-medical-600">
                      {stat.icon}
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          {criticalLogs.length > 0 && (
            <Card className="border-danger-200 bg-danger-50">
              <CardHeader>
                <div className="flex items-center gap-2 text-danger-600">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-semibold">Peringatan Keamanan</span>
                </div>
              </CardHeader>
              <CardBody>
                {criticalLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-3 bg-white rounded-lg mb-2">
                    <AlertTriangle className="w-5 h-5 text-danger-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span>{log.userName}</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>{formatDate(log.timestamp)}</span>
                      </div>
                    </div>
                    <Badge variant="danger">KRITIS</Badge>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-900">Audit Log Terbaru</h2>
                  <a href="/audit-log" className="text-sm text-medical-600 hover:text-medical-700">Lihat Semua</a>
                </div>
              </CardHeader>
              <CardBody className="p-0">
                <div className="divide-y divide-gray-100">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="px-6 py-4 hover:bg-gray-50/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{log.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{log.details}</p>
                        </div>
                        {getSeverityBadge(log.severity)}
                      </div>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>{log.userName}</span>
                        <span>{formatDate(log.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                  {auditLogs.length === 0 && (
                    <div className="p-6 text-center text-gray-500">Tidak ada log</div>
                  )}
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="font-semibold text-gray-900">Status Sistem</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Server className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Database Server</span>
                    </div>
                    <Badge variant="success">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Firewall Aktif</span>
                    </div>
                    <Badge variant="success">Aktif</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Last Backup</span>
                    </div>
                    <Badge variant="info">
                      {stats?.lastBackup ? new Date(stats.lastBackup).toLocaleDateString('id-ID') : '-'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-700">Active Sessions</span>
                    </div>
                    <Badge variant="info">{stats?.activeSessions ?? '-'}</Badge>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Aktivitas Mingguan</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-end justify-between h-32 gap-2">
                {(stats?.weeklyActivity ?? [65, 45, 78, 52, 90, 85, 70]).map((value: number, i: number) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-medical-500 rounded-t transition-all hover:bg-medical-600"
                      style={{ height: `${value}%` }}
                    />
                    <span className="text-xs text-gray-500">
                      {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </div>
  );
}
