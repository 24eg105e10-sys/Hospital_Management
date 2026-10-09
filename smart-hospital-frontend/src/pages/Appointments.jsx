import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Stethoscope, Calendar, Clock, User, Plus, CheckCircle, XCircle } from 'lucide-react';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '', doctorId: '', appointmentDateTime: '', reason: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, docRes, patRes] = await Promise.all([
        api.get('/appointments'),
        api.get('/doctors'),
        api.get('/patients')
      ]);
      setAppointments(appRes.data);
      setDoctors(docRes.data);
      setPatients(patRes.data);
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
      await api.post('/appointments', {
        patient: { id: parseInt(formData.patientId) },
        doctor: { id: parseInt(formData.doctorId) },
        appointmentDateTime: formData.appointmentDateTime,
        reason: formData.reason
      });
      setShowModal(false);
      setFormData({ patientId: '', doctorId: '', appointmentDateTime: '', reason: '' });
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error booking appointment');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await api.patch(`/appointments/${id}/status`, { status });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Appointment Scheduling</h1>
          <p className="text-slate-500 text-sm">Manage doctor schedules and patient consultations</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>Book Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Patient Name</th>
              <th className="py-4 px-6">Assigned Doctor</th>
              <th className="py-4 px-6">Date & Time</th>
              <th className="py-4 px-6">Reason for Visit</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">Loading appointments...</td></tr>
            ) : appointments.length === 0 ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">No appointments scheduled.</td></tr>
            ) : (
              appointments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-semibold text-slate-900">{a.patient?.name}</td>
                  <td className="py-4 px-6 font-medium text-sky-700">{a.doctor?.name}</td>
                  <td className="py-4 px-6 text-slate-600">{new Date(a.appointmentDateTime).toLocaleString()}</td>
                  <td className="py-4 px-6 text-slate-500 max-w-xs truncate">{a.reason || 'N/A'}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      a.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' :
                      a.status === 'CONFIRMED' ? 'bg-sky-50 text-sky-600' :
                      a.status === 'CANCELLED' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {a.status !== 'COMPLETED' && a.status !== 'CANCELLED' && (
                      <>
                        <button onClick={() => handleStatusChange(a.id, 'COMPLETED')} className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded hover:bg-emerald-200">
                          Complete
                        </button>
                        <button onClick={() => handleStatusChange(a.id, 'CANCELLED')} className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded hover:bg-red-200">
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Book New Appointment</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Patient</label>
                <select required value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Doctor</label>
                <select required value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map(d => <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Date & Time</label>
                <input required type="datetime-local" value={formData.appointmentDateTime} onChange={(e) => setFormData({...formData, appointmentDateTime: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Reason for Visit</label>
                <textarea value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" rows="3"></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Confirm Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
