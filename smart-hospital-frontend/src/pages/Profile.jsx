import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Shield, Mail, Phone, Lock } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-slate-100 space-y-6">
      <div className="flex items-center space-x-4 pb-6 border-b border-slate-100">
        <div className="w-16 h-16 rounded-full bg-sky-600 flex items-center justify-center font-bold text-2xl text-white">
          {user?.name?.charAt(0) || 'U'}
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
          <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-bold uppercase rounded bg-sky-50 text-sky-700">
            {user?.role}
          </span>
        </div>
      </div>

      <div className="space-y-4 text-sm text-slate-700">
        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
          <Mail className="w-5 h-5 text-slate-400" />
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Email Address</span>
            <span className="font-semibold">{user?.email}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
          <Phone className="w-5 h-5 text-slate-400" />
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">Phone Number</span>
            <span className="font-semibold">{user?.phone || '+1 555-000-1111'}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
          <Shield className="w-5 h-5 text-slate-400" />
          <div>
            <span className="text-xs font-bold text-slate-400 block uppercase">System Access Level</span>
            <span className="font-semibold">{user?.role} Role Authorization</span>
          </div>
        </div>
      </div>
    </div>
  );
}
