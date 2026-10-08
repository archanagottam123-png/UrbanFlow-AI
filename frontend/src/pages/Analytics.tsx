import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import DemoBanner from '../components/ui/DemoBanner';
import TrafficLineChart from '../components/charts/TrafficLineChart';
import CongestionBarChart from '../components/charts/CongestionBarChart';
import { BarChart3, Clock, TrendingUp, Gauge } from 'lucide-react';
import { generateHourlyData, generateWeeklyData, CITIES } from '../data/demoData';

const PEAK_HOURS = [
  { period: 'Morning Peak', time: '8:00 AM – 10:00 AM', avgVolume: 2250, avgDelay: 22, congestion: 'Severe' },
  { period: 'Lunch Peak', time: '12:30 PM – 2:00 PM', avgVolume: 1650, avgDelay: 12, congestion: 'High' },
  { period: 'Evening Peak', time: '5:30 PM – 8:00 PM', avgVolume: 2100, avgDelay: 20, congestion: 'Severe' },
  { period: 'Off-Peak Night', time: '11:00 PM – 5:00 AM', avgVolume: 180, avgDelay: 2, congestion: 'Low' },
];

const JUNCTION_PERF = [
  { name: 'Silk Board', city: 'Bengaluru', avgSpeed: 12, vehicles: 2840, queue: 920, congestion: 'severe' },
  { name: 'Kathipara', city: 'Chennai', avgSpeed: 14, vehicles: 2380, queue: 860, congestion: 'severe' },
  { name: 'HITEC City', city: 'Hyderabad', avgSpeed: 15, vehicles: 2100, queue: 740, congestion: 'severe' },
  { name: 'KR Puram', city: 'Bengaluru', avgSpeed: 18, vehicles: 1980, queue: 680, congestion: 'high' },
  { name: 'Koyambedu', city: 'Chennai', avgSpeed: 20, vehicles: 1780, queue: 580, congestion: 'high' },
];

const congestionColors: Record<string, string> = {
  severe: 'text-red-400',
  high: 'text-orange-400',
  moderate: 'text-yellow-400',
  low: 'text-green-400',
};

export default function Analytics() {
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const hourlyData = generateHourlyData();
  const weeklyData = generateWeeklyData().map(d => ({ label: d.day, value: d.avgCongestion }));
  const peakVolumeData = [
    { label: 'Mon', value: 2200 },
    { label: 'Tue', value: 2150 },
    { label: 'Wed', value: 2280 },
    { label: 'Thu', value: 2100 },
    { label: 'Fri', value: 2400 },
    { label: 'Sat', value: 1650 },
    { label: 'Sun', value: 1100 },
  ];

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader
          icon={BarChart3}
          title="Traffic Analytics"
          subtitle="Historical data, pattern analysis, and junction performance"
          actions={
            <div className="flex items-center gap-2">
              {CITIES.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={selectedCity === c ? 'btn-primary text-sm' : 'btn-secondary text-sm'}
                >
                  {c}
                </button>
              ))}
            </div>
          }
        />

        <DemoBanner />

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Clock, label: 'Avg Peak Delay', value: '21 min', sub: 'Morning & evening combined', color: 'text-red-400', bg: 'bg-red-600/10' },
            { icon: TrendingUp, label: 'Congestion Days/Wk', value: '5.2', sub: 'Mon–Fri typical', color: 'text-orange-400', bg: 'bg-orange-600/10' },
            { icon: Gauge, label: 'Avg Off-Peak Speed', value: '48 km/h', sub: 'Night hours', color: 'text-green-400', bg: 'bg-green-600/10' },
            { icon: BarChart3, label: 'Weekly Peak Vol', value: '2,400', sub: 'Friday highest', color: 'text-blue-400', bg: 'bg-blue-600/10' },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${bg}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-xs text-slate-400">{label}</span>
              </div>
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white text-sm">24-Hour Traffic Volume</h3>
                <p className="text-xs text-slate-400">{selectedCity} — Vehicle count & speed (Simulated)</p>
              </div>
              <span className="demo-banner">Simulated</span>
            </div>
            <TrafficLineChart data={hourlyData} height={280} />
          </div>

          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white text-sm">Weekly Congestion Index</h3>
              <span className="demo-banner">Simulated</span>
            </div>
            <CongestionBarChart data={weeklyData} height={280} unit="%" />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Peak Hours Analysis */}
          <div className="card p-5">
            <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2">
              <Clock size={16} className="text-blue-400" />
              Peak Hour Analysis
            </h3>
            <div className="space-y-3">
              {PEAK_HOURS.map(ph => (
                <div key={ph.period} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{ph.period}</p>
                    <p className="text-xs text-slate-400">{ph.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Avg Vol</p>
                    <p className="text-sm font-semibold text-white">{ph.avgVolume.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Delay</p>
                    <p className={`text-sm font-semibold ${ph.avgDelay > 15 ? 'text-red-400' : 'text-green-400'}`}>
                      {ph.avgDelay} min
                    </p>
                  </div>
                  <div className={`text-xs font-medium ${congestionColors[ph.congestion.toLowerCase()] ?? 'text-slate-400'}`}>
                    {ph.congestion}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Junction Performance */}
          <div className="card p-5">
            <h3 className="font-semibold text-white text-sm mb-4">Junction Performance Table</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-slate-400 border-b border-slate-700/50">
                    <th className="text-left pb-2 font-medium">Junction</th>
                    <th className="text-right pb-2 font-medium">Speed</th>
                    <th className="text-right pb-2 font-medium">Vol/hr</th>
                    <th className="text-right pb-2 font-medium">Queue</th>
                    <th className="text-right pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {JUNCTION_PERF.map(j => (
                    <tr key={j.name} className="hover:bg-slate-700/20">
                      <td className="py-2.5">
                        <p className="text-white font-medium text-xs">{j.name}</p>
                        <p className="text-[10px] text-slate-500">{j.city}</p>
                      </td>
                      <td className="text-right py-2.5 text-slate-300 text-xs">{j.avgSpeed} km/h</td>
                      <td className="text-right py-2.5 text-slate-300 text-xs">{j.vehicles.toLocaleString()}</td>
                      <td className="text-right py-2.5 text-slate-300 text-xs">{j.queue}m</td>
                      <td className="text-right py-2.5">
                        <span className={`text-xs font-semibold capitalize ${congestionColors[j.congestion]}`}>
                          {j.congestion}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Weekly Volume Bar */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-sm">Weekly Peak Vehicle Volume</h3>
            <span className="demo-banner">Simulated</span>
          </div>
          <CongestionBarChart data={peakVolumeData} height={220} unit=" veh/hr" />
        </div>
      </div>
    </AppLayout>
  );
}
