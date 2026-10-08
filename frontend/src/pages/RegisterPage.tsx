import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'analyst' });
  const [error, setError] = useState('');
  const { setUser } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setUser({ id: Date.now().toString(), name: form.name, email: form.email, role: form.role as any });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">UrbanFlow<span className="text-blue-400"> AI</span></span>
          </Link>
          <h2 className="text-xl font-semibold text-white">Create an account</h2>
        </div>
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-900/20 border border-red-700/30 rounded-lg px-3 py-2">
                <AlertCircle size={14} />{error}
              </div>
            )}
            {[{ label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Doe' },
              { label: 'Email', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: '••••••••' }]
              .map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="text-xs font-medium text-slate-400 block mb-1.5">{label}</label>
                  <input type={type} value={(form as any)[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} className="input-field" placeholder={placeholder} required />
                </div>
              ))}
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Role</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="select-field">
                <option value="analyst">Traffic Analyst</option>
                <option value="researcher">Researcher</option>
                <option value="admin">Admin</option>
                <option value="public">Public User</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full py-2.5 text-sm">Create Account</button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400">
            Already have an account? <Link to="/login" className="text-blue-400 hover:text-blue-300">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
