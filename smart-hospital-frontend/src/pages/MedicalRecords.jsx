import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FileText, Plus, User, Stethoscope, Calendar } from 'lucide-react';

export default function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    patientId: '', doctorId: '', diagnosis: '', symptoms: '', notes: '', visitDate: new Date().toISOString().slice(0, 16)
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [recRes, patRes, docRes] = await Promise.all([
        api.get('/medical-records'),
        api.get('/patients'),
        api.get('/doctors')
      ]);
      setRecords(recRes.data);
      setPatients(patRes.data);
      setDoctors(docRes.data);
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
      await api.post('/medical-records', {
        patient: { id: parseInt(formData.patientId) },
        doctor: { id: parseInt(formData.doctorId) },
        diagnosis: formData.diagnosis,
        symptoms: formData.symptoms,
        notes: formData.notes,
        visitDate: formData.visitDate
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating medical record');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Medical Records</h1>
          <p className="text-slate-500 text-sm">Consultation notes, diagnoses, and medical histories</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>New Clinical Record</span>
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-slate-400">Loading medical records...</div>
        ) : records.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No medical records documented.</div>
        ) : (
          records.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{r.patient?.name}</h3>
                    <p className="text-xs text-slate-400">Patient ID: {r.patient?.patientId}</p>
                  </div>
                </div>
                <div className="text-xs text-slate-500 flex items-center space-x-4">
                  <span>Doctor: <strong className="text-sky-700">{r.doctor?.name}</strong></span>
                  <span>Date: {new Date(r.visitDate).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Diagnosis</span>
                  <p className="font-medium text-slate-800 mt-1">{r.diagnosis}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">Symptoms Reported</span>
                  <p className="font-medium text-slate-800 mt-1">{r.symptoms || 'None recorded'}</p>
                </div>
              </div>
              {r.notes && (
                <div className="text-xs text-slate-500 pt-1">
                  <strong>Notes:</strong> {r.notes}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create Medical Record</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Select Patient</label>
                  <select required value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">-- Select --</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Select Doctor</label>
                  <select required value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">-- Select --</option>
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Visit Date & Time</label>
                <input required type="datetime-local" value={formData.visitDate} onChange={(e) => setFormData({...formData, visitDate: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Diagnosis</label>
                <input required type="text" value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Symptoms</label>
                <textarea value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" rows="2"></textarea>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Consultation Notes</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" rows="2"></textarea>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Save Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
