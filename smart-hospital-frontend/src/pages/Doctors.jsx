import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Stethoscope, Phone, Mail, Building2, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', specialization: '', qualification: '', phone: '', email: '', consultationFee: '120.00', departmentId: '', availableDays: 'Monday,Wednesday,Friday'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [docRes, deptRes] = await Promise.all([
        api.get('/doctors'),
        api.get('/departments')
      ]);
      setDoctors(docRes.data);
      setDepartments(deptRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/doctors', {
        ...formData,
        department: { id: parseInt(formData.departmentId) }
      });
      setShowModal(false);
      setFormData({ name: '', specialization: '', qualification: '', phone: '', email: '', consultationFee: '120.00', departmentId: '', availableDays: 'Monday,Wednesday,Friday' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding doctor');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Doctor Management</h1>
          <p className="text-slate-500 text-sm">Manage hospital medical staff, specializations, and schedules</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Doctor</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-8 text-slate-400">Loading doctors list...</div>
        ) : doctors.length === 0 ? (
          <div className="col-span-3 text-center py-8 text-slate-400">No doctors registered yet.</div>
        ) : (
          doctors.map((d) => (
            <div key={d.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-sky-50 text-sky-600 rounded-xl">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 text-emerald-600 rounded-full">
                    {d.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{d.name}</h3>
                  <p className="text-xs font-semibold text-sky-600">{d.specialization}</p>
                  <p className="text-xs text-slate-400">{d.qualification}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                  <div className="flex items-center space-x-2"><Building2 className="w-3.5 h-3.5 text-slate-400" /> <span>{d.department?.name || 'Unassigned'}</span></div>
                  <div className="flex items-center space-x-2"><Phone className="w-3.5 h-3.5 text-slate-400" /> <span>{d.phone}</span></div>
                  <div className="flex items-center space-x-2"><Mail className="w-3.5 h-3.5 text-slate-400" /> <span>{d.email}</span></div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Fee: ${d.consultationFee}</span>
                <span className="text-slate-400 font-medium">{d.availableDays}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add New Doctor</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Doctor Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Dr. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Specialization</label>
                  <input required type="text" value={formData.specialization} onChange={(e) => setFormData({...formData, specialization: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
                  <select required value={formData.departmentId} onChange={(e) => setFormData({...formData, departmentId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">-- Choose Dept --</option>
                    {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                  <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Consultation Fee ($)</label>
                  <input required type="number" step="0.01" value={formData.consultationFee} onChange={(e) => setFormData({...formData, consultationFee: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Save Doctor</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
