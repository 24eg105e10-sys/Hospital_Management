import React from 'react';
import { Shield, Lock } from 'lucide-react';

export default function UsersPage() {
  const users = [
    { name: 'System Administrator', email: 'admin@hospital.com', role: 'ADMIN', active: true },
    { name: 'Dr. Sarah Connor', email: 'dr.sarah@hospital.com', role: 'DOCTOR', active: true },
    { name: 'Dr. Robert Bruce', email: 'dr.robert@hospital.com', role: 'DOCTOR', active: true },
    { name: 'Emily Watson', email: 'reception@hospital.com', role: 'RECEPTIONIST', active: true },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">User Management & Role Permissions</h1>
        <p className="text-slate-500 text-sm">System accounts authorized for hospital access</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">User Name</th>
              <th className="py-4 px-6">Email Address</th>
              <th className="py-4 px-6">Assigned Role</th>
              <th className="py-4 px-6">Account Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {users.map((u, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition">
                <td className="py-4 px-6 font-semibold text-slate-900">{u.name}</td>
                <td className="py-4 px-6 text-slate-600">{u.email}</td>
                <td className="py-4 px-6">
                  <span className="px-2.5 py-1 text-xs font-bold bg-sky-50 text-sky-700 rounded uppercase">
                    {u.role}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="px-2 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded-full">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
