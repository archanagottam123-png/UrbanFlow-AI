import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import {
  LayoutDashboard, Radio, TrendingUp, AlertTriangle, Zap, BarChart3, FileText,
  Settings, Users, LogOut, Menu, X, ChevronDown, Bell, Activity, MapPin
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Radio, label: 'Live Traffic', path: '/live-traffic' },
  { icon: TrendingUp, label: 'Predictions', path: '/predictions' },
  { icon: AlertTriangle, label: 'Incidents', path: '/incidents' },
  { icon: Zap, label: 'Simulation', path: '/simulation' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: MapPin, label: 'Risk Junctions', path: '/high-risk' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className={clsx(
        'flex flex-col bg-slate-900 border-r border-slate-700/50 transition-all duration-300 z-20',
        sidebarOpen ? 'w-60' : 'w-16'
      )}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-700/50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {sidebarOpen && (
            <div>
              <span className="font-bold text-white text-sm">UrbanFlow</span>
              <span className="font-bold text-blue-400 text-sm"> AI</span>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-2">
          {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={clsx(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 group',
                  isActive
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                )}
                title={!sidebarOpen ? label : undefined}
              >
                <Icon className={clsx('w-4.5 h-4.5 flex-shrink-0', isActive ? 'text-blue-400' : '')} size={18} />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Demo Badge */}
        {sidebarOpen && (
          <div className="px-3 py-3 border-t border-slate-700/50">
            <div className="demo-banner text-center">⚠ Demo Data</div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-slate-900/80 border-b border-slate-700/50 backdrop-blur-sm px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div className="text-xs text-slate-500">
              Prototype — <span className="text-amber-400 font-medium">Demonstration Data</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800">
              <Bell size={18} />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {user?.name?.[0] ?? 'U'}
                </div>
                {user && <span className="text-sm text-slate-300">{user.name}</span>}
                <ChevronDown size={14} className="text-slate-400" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50">
                  <div className="px-4 py-3 border-b border-slate-700">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                    <p className="text-xs text-blue-400 capitalize">{user?.role}</p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
