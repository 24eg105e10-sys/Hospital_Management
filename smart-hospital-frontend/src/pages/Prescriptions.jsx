import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Pill, Plus, User, Stethoscope } from 'lucide-react';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    patientId: '', doctorId: '', medicalRecordId: '', notes: '',
    items: [{ medicineName: 'Paracetamol 500mg', dosage: '1 Tablet', frequency: 'Twice Daily', duration: '5 Days', instructions: 'After meals' }]
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [presRes, patRes, docRes, recRes] = await Promise.all([
        api.get('/prescriptions'),
        api.get('/patients'),
        api.get('/doctors'),
        api.get('/medical-records')
      ]);
      setPrescriptions(presRes.data);
      setPatients(patRes.data);
      setDoctors(docRes.data);
      setRecords(recRes.data);
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
      await api.post('/prescriptions', {
        patient: { id: parseInt(formData.patientId) },
        doctor: { id: parseInt(formData.doctorId) },
        medicalRecord: { id: parseInt(formData.medicalRecordId) },
        notes: formData.notes,
        items: formData.items
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error issuing prescription');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prescription Management</h1>
          <p className="text-slate-500 text-sm">Issue and manage patient pharmaceutical prescriptions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>Issue New Prescription</span>
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-slate-400">Loading prescriptions...</div>
        ) : prescriptions.length === 0 ? (
          <div className="text-center py-8 text-slate-400">No prescriptions recorded.</div>
        ) : (
          prescriptions.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-3 gap-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-teal-50 text-teal-600 rounded-lg">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Rx for {p.patient?.name}</h3>
                    <p className="text-xs text-slate-400">Prescribed by {p.doctor?.name}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-400">Date: {new Date(p.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 uppercase font-bold border-b border-slate-100">
                      <th className="py-2 px-2">Medicine Name</th>
                      <th className="py-2 px-2">Dosage</th>
                      <th className="py-2 px-2">Frequency</th>
                      <th className="py-2 px-2">Duration</th>
                      <th className="py-2 px-2">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {p.items?.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-2 font-semibold text-slate-900">{item.medicineName}</td>
                        <td className="py-2 px-2">{item.dosage}</td>
                        <td className="py-2 px-2">{item.frequency}</td>
                        <td className="py-2 px-2">{item.duration}</td>
                        <td className="py-2 px-2 text-slate-500">{item.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Issue Prescription</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Patient</label>
                  <select required value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">-- Choose Patient --</option>
                    {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Doctor</label>
                  <select required value={formData.doctorId} onChange={(e) => setFormData({...formData, doctorId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                    <option value="">-- Choose Doctor --</option>
                    {doctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Medical Record</label>
                <select required value={formData.medicalRecordId} onChange={(e) => setFormData({...formData, medicalRecordId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">-- Associated Record --</option>
                  {records.map(r => <option key={r.id} value={r.id}>Record #{r.id} - {r.diagnosis}</option>)}
                </select>
              </div>
              <div className="border p-3 rounded-xl space-y-2 bg-slate-50">
                <span className="text-xs font-bold text-slate-500 uppercase">Medication Item</span>
                <input required type="text" placeholder="Medicine Name" value={formData.items[0].medicineName} onChange={(e) => {
                  const updated = [...formData.items];
                  updated[0].medicineName = e.target.value;
                  setFormData({...formData, items: updated});
                }} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                <div className="grid grid-cols-3 gap-2">
                  <input required type="text" placeholder="Dosage (e.g. 500mg)" value={formData.items[0].dosage} onChange={(e) => {
                    const updated = [...formData.items];
                    updated[0].dosage = e.target.value;
                    setFormData({...formData, items: updated});
                  }} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                  <input required type="text" placeholder="Frequency" value={formData.items[0].frequency} onChange={(e) => {
                    const updated = [...formData.items];
                    updated[0].frequency = e.target.value;
                    setFormData({...formData, items: updated});
                  }} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                  <input required type="text" placeholder="Duration" value={formData.items[0].duration} onChange={(e) => {
                    const updated = [...formData.items];
                    updated[0].duration = e.target.value;
                    setFormData({...formData, items: updated});
                  }} className="w-full border border-slate-300 rounded px-2 py-1 text-xs" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Issue Prescription</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
