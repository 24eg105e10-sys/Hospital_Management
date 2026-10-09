import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Lock, Mail, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password credentials');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickLogin = (quickEmail) => {
    setEmail(quickEmail);
    setPassword('AdminPassword123!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-sky-600 p-8 text-center text-white">
          <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-4">
            <Activity className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Smart Hospital Portal</h2>
          <p className="text-sky-100 text-sm mt-1">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hospital.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-800 text-sm transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Password</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none text-slate-800 text-sm transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center mb-2 font-medium">Quick Demo Credentials (Click to fill):</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => fillQuickLogin('admin@hospital.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs rounded border border-slate-200 text-center font-medium"
              >
                ADMIN
              </button>
              <button
                type="button"
                onClick={() => fillQuickLogin('dr.sarah@hospital.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs rounded border border-slate-200 text-center font-medium"
              >
                DOCTOR
              </button>
              <button
                type="button"
                onClick={() => fillQuickLogin('reception@hospital.com')}
                className="py-1.5 px-2 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-600 text-xs rounded border border-slate-200 text-center font-medium"
              >
                RECEPTION
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
