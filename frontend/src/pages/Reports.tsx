import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import PageHeader from '../components/ui/PageHeader';
import DemoBanner from '../components/ui/DemoBanner';
import { FileText, Download, Calendar, BarChart3, Map, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { DEMO_STATS, INCIDENTS, HIGH_RISK_JUNCTIONS } from '../data/demoData';

const REPORT_TEMPLATES = [
  { id: 'daily', icon: Calendar, title: 'Daily Traffic Summary', desc: 'Hourly congestion levels, peak hours, incident count for a single day.', pages: 4, lastGenerated: '2 hours ago' },
  { id: 'weekly', icon: BarChart3, title: 'Weekly Pattern Report', desc: 'Day-by-day comparison, trend analysis, and week-over-week changes.', pages: 8, lastGenerated: 'Yesterday' },
  { id: 'junction', icon: Map, title: 'Junction Performance Report', desc: 'Detailed analysis of high-risk junctions with congestion frequency.', pages: 12, lastGenerated: '3 days ago' },
  { id: 'incident', icon: AlertTriangle, title: 'Incident Summary Report', desc: 'All recorded incidents with severity, duration, and impact analysis.', pages: 6, lastGenerated: '1 day ago' },
];

export default function Reports() {
  const [generating, setGenerating] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);

  const handleGenerate = (id: string) => {
    setGenerating(id);
    setTimeout(() => {
      setGenerating(null);
      setGenerated(prev => [...prev, id]);
    }, 1500);
  };

  const activeIncidents = INCIDENTS.filter(i => i.status === 'active').length;
  const severeJunctions = HIGH_RISK_JUNCTIONS.filter(j => j.riskLevel === 'critical').length;

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <PageHeader
          icon={FileText}
          title="Reports"
          subtitle="Generate and download traffic analysis reports"
        />

        <DemoBanner />

        {/* Quick Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Current Congestion', value: `${DEMO_STATS.currentCongestionLevel}%`, sub: 'City-wide average', color: 'text-red-400' },
            { label: 'Active Incidents', value: activeIncidents, sub: 'Requiring attention', color: 'text-orange-400' },
            { label: 'Critical Junctions', value: severeJunctions, sub: 'High-risk locations', color: 'text-purple-400' },
            { label: 'Avg Travel Time', value: `${DEMO_STATS.averageTravelTime} min`, sub: 'Peak hour estimate', color: 'text-yellow-400' },
          ].map(({ label, value, sub, color }) => (
            <div key={label} className="card p-4 text-center">
              <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">{label}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Report Templates */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REPORT_TEMPLATES.map(({ id, icon: Icon, title, desc, pages, lastGenerated }) => (
              <div key={id} className="card p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-white">{title}</h4>
                    {generated.includes(id) && (
                      <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{desc}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-slate-500">
                    <span className="flex items-center gap-1"><FileText size={10} />{pages} pages</span>
                    <span className="flex items-center gap-1"><Clock size={10} />Last: {lastGenerated}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerate(id)}
                  disabled={generating === id}
                  className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    generated.includes(id)
                      ? 'bg-green-600/20 text-green-400 border border-green-700/40'
                      : 'btn-primary'
                  }`}
                >
                  {generating === id ? (
                    <><span className="animate-spin">⟳</span> Generating...</>
                  ) : generated.includes(id) ? (
                    <><Download size={12} /> Download PDF</>
                  ) : (
                    <><BarChart3 size={12} /> Generate</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents Table */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Incident Log (Current Session)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700/50 text-xs">
                  <th className="text-left pb-2 font-medium">Type</th>
                  <th className="text-left pb-2 font-medium">Location</th>
                  <th className="text-left pb-2 font-medium">City</th>
                  <th className="text-left pb-2 font-medium">Severity</th>
                  <th className="text-left pb-2 font-medium">Status</th>
                  <th className="text-left pb-2 font-medium">Impact Radius</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {INCIDENTS.map(inc => (
                  <tr key={inc.id} className="hover:bg-slate-800/20">
                    <td className="py-2.5 text-white capitalize text-xs">{inc.type}</td>
                    <td className="py-2.5 text-slate-300 text-xs max-w-[180px] truncate">{inc.location}</td>
                    <td className="py-2.5 text-slate-400 text-xs">{inc.city}</td>
                    <td className="py-2.5 text-xs">
                      <span className={`font-semibold capitalize ${
                        inc.severity === 'critical' ? 'text-red-400' :
                        inc.severity === 'high' ? 'text-orange-400' :
                        inc.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{inc.severity}</span>
                    </td>
                    <td className="py-2.5 text-xs">
                      <span className={`capitalize ${
                        inc.status === 'active' ? 'text-red-400' :
                        inc.status === 'monitoring' ? 'text-yellow-400' : 'text-green-400'
                      }`}>{inc.status}</span>
                    </td>
                    <td className="py-2.5 text-slate-400 text-xs">{inc.impactRadius}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-slate-600 text-center">
          ⚠ All reports are generated from simulated/demonstration data and are for portfolio purposes only.
        </p>
      </div>
    </AppLayout>
  );
}
