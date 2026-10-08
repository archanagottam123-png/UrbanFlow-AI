import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import { Settings as SettingsIcon, Bell, Monitor, Database, User, Shield, CheckCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export default function Settings() {
  const { user } = useAppStore();
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    refreshInterval: '60',
    criticalAlerts: true,
    predictionAlerts: true,
    incidentAlerts: false,
    darkMode: true,
    compactView: false,
    showDemoBanner: true,
    mapStyle: 'dark',
    defaultCity: 'Bengaluru',
    predictionHorizon: '120',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggle = (key: keyof typeof settings) =>
    setSettings(s => ({ ...s, [key]: !s[key] }));

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-3xl">
        <PageHeader
          icon={SettingsIcon}
          title="Settings"
          subtitle="Manage application preferences and account"
        />

        {/* Account Info */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <User size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Account Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name || 'Demo User'}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Email</label>
              <input
                type="email"
                defaultValue={user?.email || 'demo@urbanflow.ai'}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Role</label>
              <input
                type="text"
                value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Analyst'}
                readOnly
                className="input-field opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Organization</label>
              <input type="text" defaultValue="Urban Traffic Authority" className="input-field" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
          </div>
          <div className="space-y-3">
            {[
              { key: 'criticalAlerts' as const, label: 'Critical incident alerts', desc: 'Notify when a high/critical severity incident is reported' },
              { key: 'predictionAlerts' as const, label: 'Congestion prediction alerts', desc: 'Notify when severe congestion is predicted within 30 min' },
              { key: 'incidentAlerts' as const, label: 'All incident updates', desc: 'Notify on every incident status change' },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-slate-700/30 transition-colors">
                <input
                  type="checkbox"
                  checked={settings[key] as boolean}
                  onChange={() => toggle(key)}
                  className="mt-0.5 rounded"
                />
                <div>
                  <p className="text-sm text-slate-200">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Display */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Monitor size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Display Preferences</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Default City</label>
                <select
                  value={settings.defaultCity}
                  onChange={e => setSettings(s => ({ ...s, defaultCity: e.target.value }))}
                  className="select-field"
                >
                  <option>Bengaluru</option>
                  <option>Hyderabad</option>
                  <option>Chennai</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1.5">Prediction Horizon</label>
                <select
                  value={settings.predictionHorizon}
                  onChange={e => setSettings(s => ({ ...s, predictionHorizon: e.target.value }))}
                  className="select-field"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
            </div>
            {[
              { key: 'compactView' as const, label: 'Compact view', desc: 'Reduce padding and card sizes for more data density' },
              { key: 'showDemoBanner' as const, label: 'Show demo data banner', desc: 'Always show the prototype/demo data warning banner' },
            ].map(({ key, label, desc }) => (
              <label key={key} className="flex items-start gap-3 cursor-pointer p-2.5 rounded-lg hover:bg-slate-700/30 transition-colors">
                <input
                  type="checkbox"
                  checked={settings[key] as boolean}
                  onChange={() => toggle(key)}
                  className="mt-0.5 rounded"
                />
                <div>
                  <p className="text-sm text-slate-200">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Data Settings */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={16} className="text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Data & Refresh</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Data Refresh Interval</label>
              <select
                value={settings.refreshInterval}
                onChange={e => setSettings(s => ({ ...s, refreshInterval: e.target.value }))}
                className="select-field"
              >
                <option value="30">Every 30 seconds</option>
                <option value="60">Every 1 minute</option>
                <option value="300">Every 5 minutes</option>
                <option value="0">Manual only</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Data Source</label>
              <input type="text" value="Synthetic / Simulated" readOnly className="input-field opacity-60 cursor-not-allowed" />
            </div>
          </div>
          <div className="mt-3 p-3 bg-amber-950/30 border border-amber-700/30 rounded-lg text-xs text-amber-400">
            <Shield size={12} className="inline mr-1" />
            This platform uses <strong>simulated data only</strong>. No real government or traffic authority APIs are connected in this prototype.
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={handleSave} className="btn-primary px-6">
            Save Changes
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-green-400 text-sm">
              <CheckCircle size={16} /> Settings saved!
            </span>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
