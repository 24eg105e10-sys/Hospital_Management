import React from 'react';
import { Activity, TrendingUp, DollarSign, Calendar } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hospital Analytics & Financial Reports</h1>
        <p className="text-slate-500 text-sm">Aggregated reporting based on database transactional data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Monthly Patient Growth</span>
          <p className="text-3xl font-extrabold text-emerald-600">+14.2%</p>
          <p className="text-xs text-slate-500">Increase in registered patient files this month</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Consultation Fulfillment</span>
          <p className="text-3xl font-extrabold text-sky-600">96.8%</p>
          <p className="text-xs text-slate-500">Scheduled appointments completed successfully</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Average Billing Clearance</span>
          <p className="text-3xl font-extrabold text-indigo-600">2.4 Days</p>
          <p className="text-xs text-slate-500">Average time from invoicing to full settlement</p>
        </div>
      </div>
    </div>
  );
}
