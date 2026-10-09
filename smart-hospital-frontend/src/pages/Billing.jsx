import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, Receipt, DollarSign, CreditCard, CheckCircle } from 'lucide-react';

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');

  const [formData, setFormData] = useState({
    patientId: '', description: 'Medical Service & Consultation', amount: '120.00', tax: '12.00', discount: '0.00'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [billRes, patRes] = await Promise.all([
        api.get('/bills'),
        api.get('/patients')
      ]);
      setBills(billRes.data);
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

  const handleCreateBill = async (e) => {
    e.preventDefault();
    const subtotal = parseFloat(formData.amount);
    const tax = parseFloat(formData.tax);
    const discount = parseFloat(formData.discount);
    const totalAmount = subtotal + tax - discount;

    try {
      await api.post('/bills', {
        patient: { id: parseInt(formData.patientId) },
        subtotal,
        tax,
        discount,
        totalAmount,
        items: [{
          description: formData.description,
          quantity: 1,
          unitPrice: subtotal,
          totalPrice: subtotal
        }]
      });
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error generating invoice');
    }
  };

  const handleRecordPayment = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/bills/${paymentModal.id}/payments`, {
        amount: parseFloat(paymentAmount),
        paymentMethod,
        transactionReference: 'TXN-' + Math.floor(100000 + Math.random() * 900000)
      });
      setPaymentModal(null);
      setPaymentAmount('');
      fetchData();
    } catch (err) {
      alert(err.response?.data?.message || 'Error recording payment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Billing & Invoices</h1>
          <p className="text-slate-500 text-sm">Generate patient invoices and process transactions</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-md transition"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Invoice</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-4 px-6">Invoice #</th>
              <th className="py-4 px-6">Patient</th>
              <th className="py-4 px-6">Total Amount</th>
              <th className="py-4 px-6">Paid Amount</th>
              <th className="py-4 px-6">Payment Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {loading ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">Loading bills...</td></tr>
            ) : bills.length === 0 ? (
              <tr><td colSpan="6" className="py-8 text-center text-slate-400">No invoices generated yet.</td></tr>
            ) : (
              bills.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/50 transition">
                  <td className="py-4 px-6 font-mono font-semibold text-sky-600">{b.invoiceNumber}</td>
                  <td className="py-4 px-6 font-medium text-slate-900">{b.patient?.name}</td>
                  <td className="py-4 px-6 font-bold text-slate-800">${Number(b.totalAmount).toFixed(2)}</td>
                  <td className="py-4 px-6 text-emerald-600 font-semibold">${Number(b.paidAmount).toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${
                      b.paymentStatus === 'PAID' ? 'bg-emerald-50 text-emerald-600' :
                      b.paymentStatus === 'PARTIALLY_PAID' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {b.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {b.paymentStatus !== 'PAID' && (
                      <button
                        onClick={() => { setPaymentModal(b); setPaymentAmount((b.totalAmount - b.paidAmount).toFixed(2)); }}
                        className="px-3 py-1.5 bg-sky-600 text-white text-xs font-semibold rounded-lg hover:bg-sky-700 transition"
                      >
                        Record Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Bill Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Create Patient Invoice</h3>
            <form onSubmit={handleCreateBill} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Patient</label>
                <select required value={formData.patientId} onChange={(e) => setFormData({...formData, patientId: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                  <option value="">-- Choose Patient --</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name} ({p.patientId})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Service Description</label>
                <input required type="text" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Amount ($)</label>
                  <input required type="number" step="0.01" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Tax ($)</label>
                  <input required type="number" step="0.01" value={formData.tax} onChange={(e) => setFormData({...formData, tax: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Discount ($)</label>
                  <input required type="number" step="0.01" value={formData.discount} onChange={(e) => setFormData({...formData, discount: e.target.value})} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg hover:bg-sky-700">Generate Invoice</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Payment Modal */}
      {paymentModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Record Payment</h3>
            <p className="text-xs text-slate-500">Invoice: <span className="font-mono font-bold text-sky-600">{paymentModal.invoiceNumber}</span></p>
            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Amount ($)</label>
                <input required type="number" step="0.01" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Payment Method</label>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm">
                  <option value="CREDIT_CARD">Credit / Debit Card</option>
                  <option value="CASH">Cash</option>
                  <option value="INSURANCE">Health Insurance</option>
                  <option value="BANK_TRANSFER">Bank Transfer</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button type="button" onClick={() => setPaymentModal(null)} className="px-4 py-2 text-slate-600 text-sm font-medium hover:bg-slate-100 rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700">Confirm Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
