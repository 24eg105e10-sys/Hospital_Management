import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Users, Stethoscope, Calendar, DollarSign, Clock, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get('/dashboard/summary');
        setSummary(res.data);
      } catch (err) {
        setError('Failed to load dashboard metrics from backend.');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500 font-medium">Loading hospital metrics...</div>;
  if (error) return <div className="p-8 text-red-600 bg-red-50 rounded-xl">{error}</div>;

  const stats = [
    { title: 'Active Patients', value: summary?.activePatients || 0, icon: Users, color: 'bg-blue-500' },
    { title: 'Active Doctors', value: summary?.activeDoctors || 0, icon: Stethoscope, color: 'bg-emerald-500' },
    { title: "Today's Appointments", value: summary?.todayAppointments || 0, icon: Calendar, color: 'bg-amber-500' },
    { title: 'Upcoming Visits', value: summary?.upcomingAppointments || 0, icon: Clock, color: 'bg-indigo-500' },
    { title: 'Unpaid Invoices', value: summary?.unpaidBills || 0, icon: AlertCircle, color: 'bg-rose-500' },
    { title: 'Total Revenue', value: `$${Number(summary?.totalRevenue || 0).toFixed(2)}`, icon: DollarSign, color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hospital Overview Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time statistics calculated from database records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                <p className="text-3xl font-extrabold text-slate-800 mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-xl text-white ${stat.color} shadow-lg shadow-sky-100`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Appointments Breakdown Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(summary?.appointmentsByStatus || {}).map(([status, count]) => (
            <div key={status} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-xs font-semibold text-slate-500 uppercase">{status}</span>
              <p className="text-2xl font-extrabold text-sky-700 mt-1">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
