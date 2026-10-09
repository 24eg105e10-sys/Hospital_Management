import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, Users, Stethoscope, Building2, Calendar, 
  FileText, Pill, Receipt, Shield, Activity, LogOut, User as UserIcon 
} from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { label: 'Patients', path: '/patients', icon: Users, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { label: 'Doctors', path: '/doctors', icon: Stethoscope, roles: ['ADMIN', 'RECEPTIONIST'] },
    { label: 'Departments', path: '/departments', icon: Building2, roles: ['ADMIN', 'RECEPTIONIST'] },
    { label: 'Appointments', path: '/appointments', icon: Calendar, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { label: 'Medical Records', path: '/medical-records', icon: FileText, roles: ['ADMIN', 'DOCTOR'] },
    { label: 'Prescriptions', path: '/prescriptions', icon: Pill, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST'] },
    { label: 'Billing & Invoices', path: '/billing', icon: Receipt, roles: ['ADMIN', 'RECEPTIONIST'] },
    { label: 'User Management', path: '/users', icon: Shield, roles: ['ADMIN'] },
    { label: 'Reports & Analytics', path: '/reports', icon: Activity, roles: ['ADMIN'] },
  ];

  const allowedNav = navItems.filter(item => item.roles.includes(user?.role));

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-3">
          <div className="p-2 bg-sky-500 rounded-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Smart Hospital</h1>
            <p className="text-xs text-sky-400 font-medium">Management System</p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {allowedNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-sky-700 flex items-center justify-center font-bold text-sm text-white">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="text-xs overflow-hidden">
              <p className="font-semibold text-white truncate">{user?.name}</p>
              <span className="inline-block px-1.5 py-0.5 text-[10px] uppercase font-bold rounded bg-slate-800 text-sky-400">
                {user?.role}
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm">
          <h2 className="text-xl font-bold text-slate-800">
            Smart Care Portal
          </h2>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/profile"
              className="flex items-center space-x-2 text-sm text-slate-600 hover:text-sky-600 font-medium"
            >
              <UserIcon className="w-4 h-4" />
              <span>Profile Settings</span>
            </NavLink>
          </div>
        </header>

        {/* Dynamic Page View */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
