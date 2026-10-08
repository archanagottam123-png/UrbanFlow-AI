import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, TrendingUp, Clock, Gauge, AlertTriangle, MapPin, Zap, ArrowRight, RefreshCw } from 'lucide-react';
import AppLayout from '../components/layout/AppLayout';
import StatCard from '../components/ui/StatCard';
import DemoBanner from '../components/ui/DemoBanner';
import TrafficLineChart from '../components/charts/TrafficLineChart';
import { DEMO_STATS, INCIDENTS, HIGH_RISK_JUNCTIONS, RECOMMENDATIONS, generateHourlyData } from '../data/demoData';
import { formatTimeAgo, getCongestionBadgeClass, getSeverityBadgeClass, getRiskBadgeClass } from '../utils/helpers';
import { useAppStore } from '../store/useAppStore';
import clsx from 'clsx';

export default function Dashboard() {
  const { isDemoMode } = useAppStore();
  const [hourlyData, setHourlyData] = useState(generateHourlyData());
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refresh = () => {
    setHourlyData(generateHourlyData());
    setLastUpdated(new Date());
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Traffic Dashboard</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh} className="btn-secondary text-sm flex items-center gap-1.5">
              <RefreshCw size={14} /> Refresh
            </button>
            <Link to="/simulation" className="btn-primary text-sm flex items-center gap-1.5">
              <Zap size={14} /> Run Simulation
            </Link>
          </div>
        </div>

        <DemoBanner />

        {isDemoMode && (
          <div className="bg-gradient-to-r from-blue-950/60 to-purple-950/60 border border-blue-700/40 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="text-yellow-400" size={16} />
              <span className="font-semibold text-white text-sm">Recruiter Demo — Bengaluru Morning Peak Scenario</span>
            </div>
            <p className="text-xs text-slate-400">You're viewing a pre-loaded scenario: <strong className="text-blue-400">Silk Board Junction, 9:00 AM, High Congestion</strong>. Navigate through the pages to see the full pipeline: Prediction → Cause Analysis → Simulation → Recommendations.</p>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard title="Current Congestion" value={DEMO_STATS.currentCongestionLevel} unit="%" icon={Activity} iconColor="text-red-400" iconBg="bg-red-600/20" trend={5} subtitle="vs last hour" alert />
          <StatCard title="Predicted Congestion" value={DEMO_STATS.predictedCongestionLevel} unit="%" icon={TrendingUp} iconColor="text-orange-400" iconBg="bg-orange-600/20" trend={9} subtitle="next 30 min" />
          <StatCard title="Avg Travel Time" value={DEMO_STATS.averageTravelTime} unit="min" icon={Clock} iconColor="text-yellow-400" iconBg="bg-yellow-600/20" trend={12} subtitle="vs baseline" />
          <StatCard title="Avg Vehicle Speed" value={DEMO_STATS.averageVehicleSpeed} unit="km/h" icon={Gauge} iconColor="text-blue-400" iconBg="bg-blue-600/20" trend={-8} subtitle="vs baseline" />
          <StatCard title="Active Incidents" value={DEMO_STATS.activeIncidents} icon={AlertTriangle} iconColor="text-red-400" iconBg="bg-red-600/20" subtitle="3 high severity" alert />
          <StatCard title="High-Risk Junctions" value={DEMO_STATS.highRiskJunctions} icon={MapPin} iconColor="text-purple-400" iconBg="bg-purple-600/20" subtitle="3 cities" />
        </div>

        {/* Charts + Incidents Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Traffic trend */}
          <div className="xl:col-span-2 card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white text-sm">24-Hour Traffic Trend</h3>
                <p className="text-xs text-slate-400">Vehicle count & average speed — Bengaluru (Simulated)</p>
              </div>
              <span className="demo-banner">Simulated</span>
            </div>
            <TrafficLineChart data={hourlyData} height={240} />
          </div>

          {/* Recent Incidents */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Recent Incidents</h3>
              <Link to="/incidents" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
            </div>
            <div className="space-y-3">
              {INCIDENTS.slice(0, 4).map((inc) => (
                <div key={inc.id} className="flex items-start gap-3 p-2.5 bg-slate-700/30 rounded-lg">
                  <div className={clsx('w-2 h-2 rounded-full mt-1.5 flex-shrink-0', {
                    'bg-red-500': inc.severity === 'critical' || inc.severity === 'high',
                    'bg-yellow-500': inc.severity === 'medium',
                    'bg-green-500': inc.severity === 'low',
                  })} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200 truncate">{inc.location}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{inc.type} · {formatTimeAgo(inc.dateTime)}</p>
                  </div>
                  <span className={getSeverityBadgeClass(inc.severity)}>{inc.severity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* High Risk + Recommendations */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* High Risk Junctions */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">High-Risk Junctions</h3>
              <Link to="/high-risk" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">View all <ArrowRight size={12} /></Link>
            </div>
            <div className="space-y-2">
              {HIGH_RISK_JUNCTIONS.slice(0, 4).map((j) => (
                <div key={j.id} className="flex items-center justify-between p-2.5 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-white">{j.name}</p>
                    <p className="text-[10px] text-slate-500">{j.city} · Peak: {j.peakCongestionTime}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">{j.congestionFrequency}%</span>
                    <span className={getRiskBadgeClass(j.riskLevel)}>{j.riskLevel}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">AI Recommendations</h3>
              <span className="demo-banner">Model-generated</span>
            </div>
            <div className="space-y-2">
              {RECOMMENDATIONS.slice(0, 4).map((rec, i) => (
                <div key={rec.id} className="flex items-start gap-3 p-2.5 bg-slate-700/30 rounded-lg">
                  <span className="w-5 h-5 bg-blue-600/30 text-blue-400 text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-slate-200">{rec.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Confidence: {rec.confidence}% · {rec.priority} priority</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
