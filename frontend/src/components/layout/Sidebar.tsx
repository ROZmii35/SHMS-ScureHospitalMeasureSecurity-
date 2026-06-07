import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Shield,
  Activity,
  Calendar,
  User,
  Pill,
  ClipboardList,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, roles: ['admin', 'doctor', 'patient', 'pharmacist'] },
  { name: 'Data Pasien', path: '/patients', icon: <Users className="w-5 h-5" />, roles: ['admin', 'doctor'] },
  { name: 'Jadwal Dokter', path: '/schedule', icon: <Calendar className="w-5 h-5" />, roles: ['admin', 'doctor', 'patient'] },
  { name: 'Janji Temu', path: '/appointments', icon: <ClipboardList className="w-5 h-5" />, roles: ['admin', 'doctor', 'patient'] },
  { name: 'Riwayat Medis', path: '/medical-records', icon: <FileText className="w-5 h-5" />, roles: ['admin', 'doctor', 'patient'] },
  { name: 'Kelola Resep', path: '/prescriptions', icon: <Pill className="w-5 h-5" />, roles: ['admin', 'pharmacist', 'doctor'] },
  { name: 'Upload Lab', path: '/upload-lab', icon: <Activity className="w-5 h-5" />, roles: ['admin', 'patient'] },
  { name: 'Audit Log', path: '/audit-log', icon: <Shield className="w-5 h-5" />, roles: ['admin'] },
  { name: 'Profil', path: '/profile', icon: <User className="w-5 h-5" />, roles: ['admin', 'doctor', 'patient', 'pharmacist'] },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role as UserRole)
  );

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-gray-900">RS Medika Utama</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 bg-medical-600 rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-4 px-3">
          <ul className="space-y-1">
            {filteredNavItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'}`
                  }
                >
                  {item.icon}
                  {!collapsed && <span>{item.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-gray-200 p-3 space-y-2">
          <NavLink
            to="/settings"
            className={`sidebar-link sidebar-link-inactive ${
              location.pathname === '/settings' ? '!' : ''
            }`}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span>Pengaturan</span>}
          </NavLink>

          <button
            onClick={logout}
            className="sidebar-link sidebar-link-inactive w-full text-danger-500 hover:text-danger-600 hover:bg-danger-50"
          >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
    </aside>
  );
}
