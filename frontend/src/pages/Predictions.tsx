import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import DemoBanner from '../components/ui/DemoBanner';
import RadialGauge from '../components/charts/RadialGauge';
import CongestionBarChart from '../components/charts/CongestionBarChart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Brain, Info } from 'lucide-react';
import { CITIES, JUNCTIONS } from '../data/demoData';

export default function Predictions() {
  const [city, setCity] = useState(CITIES[0]);
  const [junction, setJunction] = useState(JUNCTIONS[0].name);

  const forecastData = [
    { time: '+0m', prob: 70 },
    { time: '+30m', prob: 82 },
    { time: '+60m', prob: 88 },
    { time: '+90m', prob: 75 },
    { time: '+120m', prob: 60 },
  ];

  const factorsData = [
    { label: 'High Vol', value: 42, color: '#ef4444' },
    { label: 'Bottleneck', value: 25, color: '#f97316' },
    { label: 'Capacity', value: 18, color: '#eab308' },
    { label: 'Historical', value: 10, color: '#3b82f6' },
    { label: 'Weather', value: 5, color: '#a855f7' },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader icon={TrendingUp} title="AI Predictions" subtitle="Forecast congestion and understand contributing factors" />
        <DemoBanner />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Controls */}
          <div className="card p-5 space-y-4">
            <h3 className="font-semibold text-white text-sm">Prediction Parameters</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">City</label>
              <select value={city} onChange={e => setCity(e.target.value as any)} className="select-field">
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Junction</label>
              <select value={junction} onChange={e => setJunction(e.target.value)} className="select-field">
                {JUNCTIONS.filter(j => j.city === city).map(j => <option key={j.id} value={j.name}>{j.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Time Horizon</label>
              <select className="select-field">
                <option value="120">Next 2 Hours</option>
                <option value="60">Next 1 Hour</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Weather Context</label>
              <select className="select-field">
                <option value="clear">Clear</option>
                <option value="rain">Rain</option>
              </select>
            </div>
            <button className="btn-primary w-full mt-2">Generate Forecast</button>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-5 flex flex-col items-center justify-center min-h-[250px]">
                <h3 className="font-semibold text-white text-sm mb-4 self-start">Congestion Probability</h3>
                <RadialGauge value={82} label="Likelihood of severe congestion within 30m" />
                <p className="text-xs text-slate-400 mt-4 text-center">Model Confidence: 78%</p>
              </div>

              <div className="card p-5">
                <h3 className="font-semibold text-white text-sm mb-4">120-Minute Forecast</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={forecastData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="time" tick={{ fill: '#64748b', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ background: '#1e293b', border: 'none', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="prob" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card p-5">
                <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                  <Brain size={16} className="text-purple-400" /> Explainable AI Factors
                </h3>
                <CongestionBarChart data={factorsData} height={220} unit="%" />
              </div>
              
              <div className="card p-5 bg-gradient-to-br from-slate-800/80 to-purple-900/20 border-purple-700/30">
                <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
                  <Info size={16} className="text-blue-400" /> AI Explanation
                </h3>
                <div className="space-y-3 text-sm text-slate-300">
                  <p>The model predicts a <strong className="text-red-400">SEVERE (82%)</strong> congestion level at <strong>{junction}</strong> within the next 30 minutes.</p>
                  <p><strong>Primary Cause:</strong> High incoming vehicle volume (42% contribution) from the upstream corridor, combined with a downstream bottleneck (25%) reducing discharge rates.</p>
                  <p><strong>Context:</strong> Current volume is tracking 15% above the historical 30-day average for this time and day.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
