import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, Plus, UserCheck, Trash2, Edit3, Phone, Mail } from 'lucide-react';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', dateOfBirth: '', gender: 'MALE', phone: '', email: '', address: '', bloodGroup: 'O+', emergencyContact: ''
  });

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/patients${search ? `?search=${search}` : ''}`);
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', formData);
      setShowModal(false);
      setFormData({ name: '', dateOfBirth: '', gender: 'MALE', phone: '', email: '', address: '', bloodGroup: 'O+', emergencyContact: '' });
      fetchPatients();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating patient record');
    }
  };

  const handleDeactivate = async (id) => {
    if (confirm('Are you sure you want to deactivate this patient record?')) {
      try {
        await api.delete(`/patients/${id}`);
        fetchPatients();
      } catch (err) {
        alert('Failed to deactivate patient');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Management</h1>
          <p className="text-slate-500 text-sm">Register, view and update hospital patients</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>Register New Patient</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-3">
        <Search className="w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search by Patient ID, Name, or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-sm outline-none text-slate-700"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">ID & Patient Name</th>
              <th className="py-4 px-6">Gender / DOB</th>
              <th className="py-4 px-6">Contact Information</th>
              <th className="py-4 px-6">Blood Group</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">Loading records...</td></tr>
            ) : patients.length === 0 ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">No patient records found.</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-900">{p.name}</p>
                    <span className="text-xs font-mono text-sky-600">{p.patientId}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p>{p.gender}</p>
                    <p className="text-xs text-slate-400">{p.dateOfBirth}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1 text-slate-600"><Phone className="w-3.5 h-3.5" /> <span>{p.phone}</span></div>
                    {p.email && <div className="flex items-center space-x-1 text-xs text-slate-400 mt-0.5"><Mail className="w-3.5 h-3.5" /> <span>{p.email}</span></div>}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-red-50 text-red-600 font-bold text-xs rounded-full">{p.bloodGroup || 'N/A'}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${p.active ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      {p.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button onClick={() => handleDeactivate(p.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Register New Patient</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Date of Birth</label>
                  <input required type="date" value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Gender</label>
                  <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Phone</label>
                  <input required type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Blood Group</label>
                  <input type="text" value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Save Patient</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
