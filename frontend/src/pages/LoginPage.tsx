import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { Activity, Zap, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAppStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const ok = await login(email, password);
    setLoading(false);
    if (ok) navigate('/dashboard');
    else setError('Invalid credentials. Try the demo accounts below.');
  };

  const fillDemo = (e: string, p: string) => { setEmail(e); setPassword(p); setError(''); };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold">UrbanFlow<span className="text-blue-400"> AI</span></span>
          </Link>
          <h2 className="text-xl font-semibold text-white">Sign in to your account</h2>
          <p className="text-sm text-slate-400 mt-1">Traffic Intelligence Platform</p>
        </div>

        {/* Demo Accounts */}
        <div className="card p-4 mb-6 space-y-2">
          <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Demo Accounts</p>
          {[
            { label: '🎯 Recruiter Demo', email: 'recruiter@urbanflow.ai', pass: 'recruit123', role: 'Researcher' },
            { label: '🔧 Traffic Analyst', email: 'demo@urbanflow.ai', pass: 'demo123', role: 'Analyst' },
            { label: '⚙️ Admin', email: 'admin@urbanflow.ai', pass: 'admin123', role: 'Admin' },
          ].map(({ label, email: e, pass: p, role }) => (
            <button
              key={e}
              onClick={() => fillDemo(e, p)}
              className="w-full flex items-center justify-between bg-slate-700/40 hover:bg-slate-700/70 rounded-lg px-3 py-2 transition-colors"
            >
              <span className="text-sm text-slate-300">{label}</span>
              <span className="text-xs text-slate-500 badge-green">{role}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="card p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-900/20 border border-red-700/30 rounded-lg px-3 py-2">
                <AlertCircle size={14} />
                {error}
              </div>
            )}
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-400 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-10"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-slate-400">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300">Register</Link>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Prototype — Demonstration Data Only
        </p>
      </div>
    </div>
  );
}
