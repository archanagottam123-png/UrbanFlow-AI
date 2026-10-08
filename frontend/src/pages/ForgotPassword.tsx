import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full card p-6 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-sm text-slate-400 mb-6">Enter your email and we'll send a link to reset your password.</p>
        <input type="email" className="input-field mb-4" placeholder="Email Address" />
        <button className="btn-primary w-full mb-4">Send Reset Link</button>
        <Link to="/login" className="text-xs text-blue-400 hover:underline">Back to Login</Link>
      </div>
    </div>
  );
}
