import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="p-4 bg-amber-50 text-amber-600 rounded-full mb-4">
        <AlertTriangle className="w-12 h-12" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-800">404 - Page Not Found</h1>
      <p className="text-slate-500 mt-2 max-w-sm">The page or resource you requested does not exist or has been moved.</p>
      <Link to="/dashboard" className="mt-6 px-6 py-2.5 bg-sky-600 text-white font-medium text-sm rounded-xl shadow hover:bg-sky-700 transition">
        Return to Dashboard
      </Link>
    </div>
  );
}
